const mongoose = require('mongoose');
const itemSchema = require('./item');

const orderSchema = new mongoose.Schema({
	itemId: {
		type: String,
		required: false
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
			address: '',
			city: '',
			state: '',
			zipcode: '',
			country: ''
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
	},
	shippingCarrier: {
		type: Object,
		required: false
	}
});

module.exports = mongoose.model('order', orderSchema);

