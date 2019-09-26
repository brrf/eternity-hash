const mongoose = require('mongoose');
const itemSchema = require('./item');

const unregisteredCartSchema = new mongoose.Schema({
	ip: {
		required: true,
		type: String
	},
	cart: {
		type: [itemSchema]
	},
	purchasedItems: {
		type: [itemSchema]
	}
});

module.exports = mongoose.model('UnregisteredCart', unregisteredCartSchema);