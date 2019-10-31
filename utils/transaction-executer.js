const Order = require('../schemas/order');
const bitcoin = require('bitcoinjs-lib');
const fetch = require('node-fetch');

const hashMessage = require('./hash-message');


async function findAndExecuteTransactions () {
	//find all transactions that are pendingDate - if 5 hours into the date then execute bitcoin transaction 
	const purchases = await Order.find({status: 'pendingDate'});
	var newtx = {
		inputs: [{
			addresses: ['CCKn36iNpCBcHeqmb9CY38hqzwG1kuQadj']
		}],
		outputs: [{
			addresses: ['BvzvHJFXyq6X7fwDhvjeSqcLqZj2c2yJ6A'], 
			value: 0,
			//script: '6a4868656c6c6f207468657265206d792062616265',
			script_type: "null-data"  	
		}]
	};

	purchases.forEach(purchase => {
		//console.log(purchase.item.date - new Date().getTime());
		//console.log(date - new Date().getTime());
		//18000000 = 5 hours; transactions will be executed at 5am. For testing purposes, will do 30000(30s)
		if ((purchase.item.date - new Date().getTime()) <= -30000) {


			//add user personal message to transaction body
			const message = hashMessage(purchase.item.message);
			newtx.outputs[0].script = `6a48${message}`;

			//prepare transaction
			fetch("https://api.blockcypher.com/v1/bcy/test/txs/new?token=a38ba880bab24358b4273b07344a9e3f", {
				method: "POST",
				body: JSON.stringify(newtx),
				headers: {"Content-Type": "application/json"}
			})
			.then(res => res.json())
			.then(tempTx => {

				//sign transaction
				const pKey = "30f24dfb3ae13f2dcbc7f3c1054aee5617f41f6136cf4c5978b6e2a7022845c1";
				const keypair = bitcoin.ECPair.fromPrivateKey(Buffer.from(pKey, "hex"))
				
				tempTx.pubkeys = [];
				

			    tempTx.signatures = tempTx.tosign.map(function(tosign) {
			    	tempTx.pubkeys.push(keypair.publicKey.toString("hex"));
			     	let signature = keypair.sign(Buffer.from(tosign, "hex"));
			     	let encodedSignature = bitcoin.script.signature.encode(signature,  bitcoin.Transaction.SIGHASH_NONE).toString("hex");
			     	return encodedSignature.slice(0, encodedSignature.length - 2);
			     })
			    return tempTx
			})
			.then(tempTx => {
				setTimeout(() => {
					//submit transaction
					fetch("https://api.blockcypher.com/v1/bcy/test/txs/send?token=a38ba880bab24358b4273b07344a9e3f", {
					method: "POST",
					body: JSON.stringify(tempTx),
					headers: {"Content-Type": "application/json"}
					})
					.then(res => res.json())
					.then(async finalTx => {
						console.log({finalTx})
						//update status of Order
						await Order.findByIdAndUpdate(purchase._id, {
							status: 'transactionSubmitted',
							hash: finalTx.tx.hash
						})
					})
					.catch(err => console.log(err));
				}, 1000)
			})			
		}
	})
}

module.exports = findAndExecuteTransactions;