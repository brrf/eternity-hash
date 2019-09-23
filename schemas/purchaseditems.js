const mongoose = require('mongoose');
const itemSchema = require('./item');

const purchasedItemsSchema = new mongoose.Schema({
	itemDetails: {
		type: itemSchema
		required: true
	},
	//status: pendingDate, transactionSubmitted, transactionConfirmed, Printed, Shipped
	status: {
		type: String,
		required: true,
		default: 'pendingDate'
	},
	shippingInformation: {
		type: Object,
		required: true
		default: {
			address1: '',
			address2: '',
			city: '',
			state: '',
			postalCode: ''
		}
	}
});

module.exports = mongoose.model('PurchasedItems', purchasedItemsSchema);