const mongoose = require('mongoose');
const itemSchema = require('./item');

const purchasedItemSchema = new mongoose.Schema({
	date: {
		type: Date,
		required: true
	},
	message: {
		type: String,
		required: true
	},
	pieceId: {
		type: String,
		required: true
	},
	//status: accountInformation, shippingInformation, pendingDate, transactionSubmitted, transactionConfirmed, Printed, Shipped
	status: {
		type: String,
		required: true,
		default: 'accountInformation'
	},
	shippingInformation: {
		type: Object,
		required: true,
		default: {
			address1: '',
			address2: '',
			city: '',
			state: '',
			postalCode: ''
		}
	},
	accountInformation: {
		type: Object,
		required: true
	}
});

module.exports = mongoose.model('PurchasedItems', purchasedItemSchema);