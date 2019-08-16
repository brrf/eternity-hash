const path = require('path');
const User = require('../schemas/users');
const UnregisteredCart = require('../schemas/unregistered-cart');
const passport = require('passport');
const bcrypt = require('bcrypt');

module.exports = function (app) {

	app.route('/authenticate')
		.get(function(req, res) {	
			if (req.user) {
				return res.json({loggedIn: true})
			} else {
				return res.json({loggedIn: false})
			}
		});

	app.post('/authentication/login', passport.authenticate('local'), (req, res) => {
    	res.json({errors: false, user: req.user})
    });

 	app.route('/authentication/logout')
 		.get(function(req, res) {
	  		req.logout();
	  		res.json({error: false});
		});

	app.route('/authentication/register')
		.post( async (req, res) => {
			let cart = [];
			let errors = [];
			const saltRounds = 10;
			const {username, password, password2, fname, lname, email} = req.body;
			if (!username || !password || !password2 || !fname || !lname || !email) {
				errors.push('Please fill out all items');
			};
			if (password !== password2) {
				errors.push('Passwords do not match')
			};

			user = await User.findOne({username});
			if (user) {
				errors.push('Username is already registered. Try logging in!')
			} 
			if (errors.length > 0) {
				res.json({errors})
			} else {
				await bcrypt.genSalt(saltRounds, function(err, salt) {
    				bcrypt.hash(password, salt, async function(err, hash) {
	    				let unregisteredCart = await UnregisteredCart.findOne({ip: req.ip});
	    				if (unregisteredCart) {
	    					cart = unregisteredCart.cart;
	    					await UnregisteredCart.findByIdAndDelete(unregisteredCart._id);
	    				}					
						await User.create({
							username,
							password: hash,
							fname,
							lname,
							email,
							cart
						}, (err, user) => {
							if (err) {
								console.error(err);
								res.send('an error occurred');
							} else {
								return res.json({errors: false})
							}
							}
						);
		    		});
				});				
			}			
		})
}