const mongoose = require('mongoose');

const itemSubSchema = new mongoose.Schema({
	pieceId: {
		type: String
	},
	message: {
		type: String
	},
	date: {
		type: Date
	}
});

const userSchema = new mongoose.Schema({
	username: {
		required: true,
		type: String,
		unique: true
	},
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
		type: [itemSubSchema],
		default: []
	},
	purchasedItems: {
		type: [itemSubSchema],
		default: []
	}
});

module.exports = mongoose.model('User', userSchema);