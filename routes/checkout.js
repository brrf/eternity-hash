const UnregisteredCart = require('../schemas/unregistered-cart');
const User = require('../schemas/users');
const Piece = require('../schemas/pieces')


module.exports = function (app) {

	app.route('/cart')
		.get(async (req, res) => {
			if (!req.user) {
				try {
					let cart = [];
					const cartObj = await UnregisteredCart.findOne({ip: req.ip});
					if (!cartObj) return res.json({cart: null})
					else {
						await Promise.all(cartObj.cart.map( async itemRef => {
							const item = await Piece.findById(itemRef.pieceId);
							cart.push(item);
						}));
					return res.json({cart})
					}
				} catch {
					console.log('error finding unregistered cart')
				}
			} else {
				try {
					const cart = await User.findOne({id: req.user._id});
					if (!cart) return res.json({cart: null})
					return res.json({cart: cart.cart})
				} catch {
					console.log('error finding registered cart')
				}
			}
		})
		.post(async (req, res) => {
			if (!req.body.date || !req.body.message) {
				return res.json({error: 'Please provide a date and personalized message'})
			} else if (req.user) {
				const item = {
					message: req.body.message,
					date: req.body.date
				}
				try {
					await User.findByIdAndUpdate(req.user._id, {
					$push: {cart: item}
					})
					return res.json({item, error: false})
				} catch {
					return res.json({error: 'error saving item to registered cart'})
				}			
			} else if (req.ip) {
				const item = {
					message: req.body.message,
					date: req.body.date,
				}			
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
				return res.json({item, error: false})			
					
			}
			else return res.json({error: 'An unknown error occurred'})
		})
}