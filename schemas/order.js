const mongoose = require('mongoose');
const itemSchema = require('./item');

const orderSchema = new mongoose.Schema({
	item: {
		type: Object,
		required: true,
	},
	//status: created, accountInformation, shippingInformation, pendingDate, transactionSubmitted, transactionConfirmed, shipped
	status: {
		type: String,
		required: true,
		default: 'created'
	},
	hash: {
		type: String,
		required: false
	},
	confirmations: {
		type: Number,
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
	shippingLabel: {
		type: Object,
		required: false
	}
});

module.exports = mongoose.model('order', orderSchema);

