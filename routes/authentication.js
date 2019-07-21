const path = require('path');
const User = require('../schemas/users')

module.exports = function (app) {
	app.route('/authentication/login')
		.get( (req, res) => {
			res.sendFile(path.join(__dirname, '../public/login.html'))
		})
		.post(async (req, res) => {
			res.send('working')
		})
	app.route('/authentication/register')
		.get( (req, res) => {
			res.sendFile(path.join(__dirname, '../public/register.html'))
		})
		.post( async (req, res) => {
			let errors = [];
			const {username, password, password2, fname, lname, email} = req.body;
			if (!username || !password || !password2 || !fname || !lname || !email) {
				errors.push('please fill out all items');
			};
			if (password !== password2) {
				errors.push('passwords do not match')
			};

			let user = await User.findOne({email});
			if (user) {
				errors.push('Email is already registered. Try logging in!')
			} 
			if (errors.length > 0) {
				res.json(errors)
			} else {
				await User.create({
					username,
					password,
					fname,
					lname,
					email
				})
				res.send('registered!')
			}
			
		})
}