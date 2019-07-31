const path = require('path');
const User = require('../schemas/users');
const passport = require('passport');
const bcrypt = require('bcrypt');

module.exports = function (app) {

	app.route('/comingsoon')
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

	//  app.post('/authentication/login', (req, res, next) => {
	//     passport.authenticate('local', (err, theUser, failureDetails) => {
	//         if (err) {
	//             res.status(500).json({ message: 'Something went wrong authenticating user' });
	//             return;
	//         }

	//         if (!theUser) {
	//             res.status(401).json(failureDetails);
	//             return;
	//         }

	//         // save user in session
	//         req.login(theUser, (err) => {
	//             if (err) {
	//                 res.status(500).json({ message: 'Session save went bad.' });
	//                 return;
	//             }
	//             req.session.user = req.user
	//             req.session.save();
	//             console.log('first test', req.session)
	//             console.log('---123456789098765432345678---', req.user);
	//             res.status(200).json({errors: false, user: theUser});
	//         });
	//     })(req, res, next);
	// });

 	app.route('/authentication/logout')
 		.get(function(req, res) {
	  		req.logout();
	  		res.json({error: false});
		});

	app.route('/authentication/register')
		.post( async (req, res) => {
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
    					try {
							await User.create({
								username,
								password: hash,
								fname,
								lname,
								email
							})
							res.json({errors: false, success: 'You are registered'})
						} catch (err) {
							console.error(err);
							res.send('An error occurred!')
						}
		    		});
				});
					
			}			
		})
}