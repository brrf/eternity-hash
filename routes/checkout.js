


module.exports = function (app) {

	app.post('/cart', (req, res) => {
		if (req.user) {
			res.json({addedToCart: true})
		} else if (req.ip) {
			res.json({addedToCar
			})
		}
		else res.json({addedToCart: false})
	})
}