const path = require('path');
const User = require('../schemas/users')

module.exports = function (app) {
	app.route('/authentication/login')
		.get( (req, res) => {
			res.sendFile(path.join(__dirname, '../public/login.html'))
		})
		.post(async (req, res) => {
			User.
			res.send('working')
		})
	app.route('/authentication/register')
		.get( (req, res) => {
			res.sendFile(path.join(__dirname, '../public/register.html'))
		})
}