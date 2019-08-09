const UnregisteredCart = require('../schemas/unregistered-cart');
const User = require('../schemas/users');


module.exports = function (app) {

	app.post('/cart', async (req, res) => {
		if (!req.body.date || !req.body.message) {
			return res.json({error: 'Please provide a date and personalized message'})
		} else if (req.user) {
			try {
				await User.findByIdAndUpdate(req.user._id, {
				$push: {cart: req.body.tempId}
				})
				return res.json({addedToCart: true, error: false})
			} catch {
				return res.json({error: 'error saving item to registered cart'})
			}			
		} else if (req.ip) {
			try {
				await UnregisteredCart.create({
					piece_id: req.body.tempId,
					ip: req.ip
				})
				return res.json({addedToCart: true, error: false})
			} catch {
				return res.json({error: 'error saving item to unregistered cart'})
			}
		}
		else return res.json({error: 'An unknown error occurred'})
	})
}