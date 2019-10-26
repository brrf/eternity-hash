const mongoose = require('mongoose');
const itemSchema = require('./item');

const orderSchema = new mongoose.Schema({
	item: {
		type: Object,
		required: true,
		default: {
			pieceId: '',
			message: '',
			date: ''
		}
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
	shippingLabel: {
		type: Object,
		required: false
	}
});

module.exports = mongoose.model('order', orderSchema);

