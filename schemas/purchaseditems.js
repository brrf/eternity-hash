const mongoose = require('mongoose');

const purchasedItemsSchema = new mongoose.Schema({
	pieceId: {
		type: String
	},
	message: {
		type: String
	},
	date: {
		type: Date
	},
	//status: pendingDate, transactionSubmitted, transactionConfirmed, Printed, Shipped
	status: {
		type: String,
		required: true,
		default: 'pendingDate'
	}
});

module.exports = mongoose.model('PurchasedItems', purchasedItemsSchema);