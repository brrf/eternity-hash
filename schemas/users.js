const mongoose = require('mongoose');
const itemSchema = require('./item');

const userSchema = new mongoose.Schema({
	password: {
		required: true,
		type: String
	},
	fname: {
		required: true,
		type: String
	},
	lname: {
		required: true,
		type: String
	},
	email: {
		required: true,
		type: String,
		unique: true
	},
	cart: {
		type: [itemSchema]
	},
	purchasedItems: {
		type: [itemSchema]
	}
});

module.exports = mongoose.model('User', userSchema);