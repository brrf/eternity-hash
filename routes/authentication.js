const path = require('path');
const User = require('../schemas/users');
const passport = require('passport');
const bcrypt = require('bcrypt');

module.exports = function (app) {
	app.route('/authentication/login')
		.get( (req, res) => {
		res.sendFile(path.join(__dirname, '../src/login.html'))
		})
		
		.post(passport.authenticate('local', {
		failureRedirect: '/authentication/login',
		}), function(req, res) {
    		res.redirect('/');
 	});

	app.route('/authentication/register')
		.get( (req, res) => {
			res.sendFile(path.join(__dirname, '../public/register.html'))
		})
		.post( async (req, res) => {
			let errors = [];
			const saltRounds = 10;
			const {username, password, password2, fname, lname, email} = req.body;
			if (!username || !password || !password2 || !fname || !lname || !email) {
				errors.push('please fill out all items');
			};
			if (password !== password2) {
				errors.push('passwords do not match')
			};

			let user = await User.findOne({username});
			if (user) {
				errors.push('Username is already registered. Try logging in!')
			} 
			if (errors.length > 0) {
				res.json(errors)
			} else {
				bcrypt.genSalt(saltRounds, function(err, salt) {
    				bcrypt.hash(password, salt, async function(err, hash) {
    					try {
							await User.create({
								username,
								password: hash,
								fname,
								lname,
								email
							})
							res.redirect('/authentication/login')
						} catch (err) {
							console.error(err);
							res.send('An error occurred!')
						}
		    		});
				});
					
			}			
		})
}