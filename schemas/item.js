const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
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

module.exports = itemSchema