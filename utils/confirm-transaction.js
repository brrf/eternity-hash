const PurchasedItem = require('../schemas/purchaseditems');
const fetch = require('node-fetch');

async function confirmTransaction () {
	const purchases = await PurchasedItem.find({status: 'transactionSubmitted'});
	purchases.forEach(purchase => {
		fetch(`https://api.blockcypher.com/v1/bcy/test/txs/${purchase.hash}`, {
				method: "GET"
		})
		.then(res => res.json())
		.then(async tx => {
			if (tx.confirmations >= 6) {
				await PurchasedItem.findByIdAndUpdate(purchase._id, {
					status: 'transactionConfirmed'
				})
			}
		});
	})
}

module.exports = confirmTransaction;