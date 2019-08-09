const mongoose = require('mongoose');

const registeredCartSchema = new mongoose.Schema({
	piece_id: {
		required: true,
		type: String
	},
	user_id: {
		required: true
		type: String
	}
});

module.exports = mongoose.model('RegisteredCart', registeredCartSchema);