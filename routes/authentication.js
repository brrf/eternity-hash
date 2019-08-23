const path = require('path');
const User = require('../schemas/users');
const UnregisteredCart = require('../schemas/unregistered-cart');
const passport = require('passport');
const bcrypt = require('bcrypt');
const transferUnregisteredCart = require('../utils/transfer-unregistered-cart');

module.exports = function (app) {

	app.route('/authenticate')
		.get(function(req, res) {	
			if (req.user) {
				return res.json({loggedIn: true})
			} else {
				return res.json({loggedIn: false})
			}
		});

	app.post('/authentication/login', passport.authenticate('local'), async (req, res) => {
		const cart = await transferUnregisteredCart(req.ip);
		try {
			if (cart) {
				console.log({thecartIs: cart})
				await User.findByIdAndUpdate(req.user._id, {
					$push: {cart: {$each: cart} }
					})	
			}	
		} catch {
			return res.json({error: 'error saving item to registered cart'})
		}	
		console.log(`${req.user.username} is logged in`);
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

			let user = await User.findOne({username});
			if (user) {
				errors.push('Username is already registered. Try logging in!')
			} 
			if (errors.length > 0) {
				res.json({errors})
			} else {
				bcrypt.genSalt(saltRounds, function(err, salt) {
    				bcrypt.hash(password, salt, async function(err, hash) {
    					const cart = transferUnregisteredCart(req.ip)
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