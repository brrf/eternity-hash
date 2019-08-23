const UnregisteredCart = require('../schemas/unregistered-cart');
const User = require('../schemas/users');
const Piece = require('../schemas/pieces')
const hydratePiece = require('../utils/hydrate-piece');


module.exports = function (app) {

	app.route('/cart')
		.get(async (req, res) => {
			let cart = [];
			//if not logged in, check the ip address for a mongoDB cart
			if (!req.user) {
				try {
					const cartObj = await UnregisteredCart.findOne({ip: req.ip});
					if (!cartObj) return res.json({cart: []})
					else {
						await Promise.all(cartObj.cart.map( async itemRef => {
							const piece = await Piece.findById(itemRef.pieceId);
							cart.push({
								piece,
								message: itemRef.message,
								date: itemRef.date,
								itemId: itemRef._id
							});
						}));
					}
				} catch {
					console.log('error finding unregistered cart')
				}
			} else {
			//if user logged in, lookup their cart
				try {
					if (req.user.cart === []) return res.json({cart: []});
					else {
						await Promise.all(req.user.cart.map( async itemRef => {
							const piece = await Piece.findById(itemRef.pieceId);
							cart.push({
								piece,
								message: itemRef.message,
								date: itemRef.date,
								itemId: itemRef._id
							});
						}));
					}
				} catch {
					console.log('error finding registered cart')
				}
			}
			res.json({cart})
		})
		.post(async (req, res) => {
			if (!req.body.date || !req.body.message) {
				return res.json({error: 'Please provide a date and personalized message'})
			}
			const item = {
				message: req.body.message,
				date: req.body.date,
				pieceId: req.body.pieceId
			}
			//if logged in, add item to their cart
			if (req.user) {
				try {
					await User.findByIdAndUpdate(req.user._id, {
					$push: {cart: item}
					})
				} catch {
					return res.json({error: 'error saving item to registered cart'})
				}	
			//if not logged in, associate item with their ip address in mongodb		
			} else if (req.ip) {		
				let unregisteredCart = await UnregisteredCart.findOneAndUpdate({ip: req.ip}, {
						$push: {cart: item}
					});
				if (!unregisteredCart) {
					try {
						await UnregisteredCart.create({
							ip: req.ip,
							cart: [item]
						})
					} catch {
						return res.json({error: 'error saving item to unregistered cart'});
					}
				}								
			}
			//return object containing full piece, message and date
			try {
				item.piece = await hydratePiece(req.body.pieceId);
				delete item.pieceId;
				return res.json({item, error: null})
			} catch {
				return res.json({error: 'could not return the full piece'})
			}
		})
		.delete(async (req, res) => {

			function deleteUser(err, user) {
				if (err) {
						return res.json({error: 'An error occurred with your account'});
					} else if (!user) {
						return res.json({error: 'This user does not seem to exist'})
					} else {
						user.cart = user.cart.filter( item => item._id != req.body.itemId);
						user.save();
					}
			}
			if (req.user) {
				await User.findById(req.user._id, function (err, user) {
					deleteUser(err, user);
				})
			} else {
				await UnregisteredCart.findOne({ip: req.ip}, function (err, user) {
					deleteUser(err, user);
				})
			}
			return res.json({a: 1});
		})
}