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

const unregisteredCartSchema = new mongoose.Schema({
	ip: {
		required: true,
		type: String
	},
	cart: {
		type: [cartSubschema]
	}
});

module.exports = mongoose.model('UnregisteredCart', unregisteredCartSchema);