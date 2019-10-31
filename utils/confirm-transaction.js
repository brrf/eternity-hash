const Order = require('../schemas/order');
const fetch = require('node-fetch');

async function confirmTransaction () {
	const purchases = await Order.find({status: 'transactionSubmitted'});
	purchases.forEach(purchase => {
		fetch(`https://api.blockcypher.com/v1/bcy/test/txs/${purchase.hash}`, {
				method: "GET"
		})
		.then(res => res.json())
		.then(async tx => {
			if (tx.confirmations >= 6) {
				try {
					await Order.findByIdAndUpdate(purchase._id, {
					status: 'transactionConfirmed',
					confirmations: tx.confirmations
					})
				} catch {
					console.log('error updating status to transactionConfirmed')
				}
			} else {
				try {
					await Order.findByIdAndUpdate(purchase._id, {
						confirmations: tx.confirmations
					})
				} catch {
					console.log('error updating # of transactions')
				}
			}
		});
	})
}

module.exports = confirmTransaction;