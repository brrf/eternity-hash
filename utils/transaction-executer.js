const PurchasedItem = require('../schemas/purchaseditems');


async function findAndExecuteTransactions () {
	const purchases = await PurchasedItem.find({status: 'pendingDate'});
	purchases.forEach(purchase => {
		console.log(purchase.date - new Date().getTime());
	})
}



module.exports = findAndExecuteTransactions;