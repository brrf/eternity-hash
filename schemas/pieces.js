const mongoose = require('mongoose');

const pieceSchema = new mongoose.Schema({
	title: {
		required: true,
		type: String
	},
	description: {
		required: true,
		type: String
	},
	price: {
		required: true,
		type: Number
	},
	maxLimit: {
		type: Number
	},
	thumbnails: {
		required: true,
		type: [String]
	}
});

module.exports = mongoose.model('User', userSchema);