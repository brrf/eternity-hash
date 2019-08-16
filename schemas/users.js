const mongoose = require('mongoose');

const cartSubschema = new mongoose.Schema({
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
		type: String
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
		type: String
	},
	cart: {
		type: [cartSubschema],
		default: []
	}
});

module.exports = mongoose.model('User', userSchema);