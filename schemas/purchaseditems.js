const mongoose = require('mongoose');
const itemSchema = require('./item');

const purchasedItemSchema = new mongoose.Schema({
	date: {
		type: Number,
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
	//status: created, accountInformation, shippingInformation, pendingDate, transactionSubmitted, transactionConfirmed, Printed, Shipped
	status: {
		type: String,
		required: true,
		default: 'created'
	},
	hash: {
		type: String,
		required: false
	},
	shippingInformation: {
		type: Object,
		required: true,
		default: {
			address1: '',
			address2: '',
			city: '',
			state: '',
			zipcode: ''
		}
	},
	accountInformation: {
		type: Object,
		required: true,
		default: {
			email: '',
			fname: '',
			lname: ''
		}
	}
});

module.exports = mongoose.model('PurchasedItems', purchasedItemSchema);