const mongoose = require('mongoose');

const hashSchema = new mongoose.Schema({
	date: {
		type: Date,
		required: true
	},
	message: {
		type: String,
		required: true
	},
	hash: {
		type: String
	},
	//created, scheduled, transactionSubmitted, transactionConfirmed
	status: {
		type: String,
		required: true,
		default: 'created'
	}
});

module.exports = {
	hash: mongoose.model('hash', hashSchema),
	hashSchema: hashSchema
}