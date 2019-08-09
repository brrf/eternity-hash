const mongoose = require('mongoose');

const unregisteredCartSchema = new mongoose.Schema({
	piece_id: {
		required: true,
		type: String
	},
	ip: {
		required: true,
		type: String
	}
});

module.exports = mongoose.model('UnregisteredCart', unregisteredCartSchema);