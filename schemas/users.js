const mongoose = require('mongoose');
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
	}
});

module.exports = mongoose.model('User', userSchema);