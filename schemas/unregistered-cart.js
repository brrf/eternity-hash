const mongoose = require('mongoose');

const unregisteredCartSchema = new mongoose.Schema({
	pieceId: {
		required: true,
		type: String
	},
	ip: {
		required: true,
		type: String
	},
	message: {
		required: true,
		type: String
	},
	date: {
		required: true,
		type: Date
	}
});

module.exports = mongoose.model('UnregisteredCart', unregisteredCartSchema);