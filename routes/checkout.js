const UnregisteredCart = require('../schemas/unregistered-cart');
const User = require('../schemas/users');


module.exports = function (app) {

	app.post('/cart', async (req, res) => {
		if (!req.body.date || !req.body.message) {
			return res.json({error: 'Please provide a date and personalized message'})
		} else if (req.user) {
			const item = {
				pieceId: req.body.tempId,
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
				pieceId: req.body.tempId,
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