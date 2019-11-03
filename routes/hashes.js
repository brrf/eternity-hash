const Hash = require('../schemas/hash').hash;
const User = require('../schemas/users');

const assignUser = require('../utils/assignUser');
const calculateDate = require('../utils/calculateDate');
const calculateTax = require('../utils/calculateTax');

module.exports = function(app) {
	app.route('/hashes')
		.post( async (req, res) => {
			if (!req.body.date || !req.body.timeZone || !req.body.message) {
				return res.json({error: 'Incomplete form'});
			}
			const date = calculateDate(req.body.date, req.body.timeZone);
			try {
				const hash = await Hash.create({
					date,
					message: req.body.message
				})
				res.json(hash)
			} catch {
				console.log({error: 'Could not create new hash'})
			}
		})
	app.route('/hashes/:id')
		.post(async (req, res) => {
			const user = await assignUser(req, res);
			if (user.error) return res.json({error: user.error});

			await stripe.charges.create({
		      amount: (19.99 + req.body.tax) * 100,
		      currency: "usd",
		      description: "Eternity Hash Purchase",
		      source: req.body.stripeToken,
		      receipt_email: order.accountInformation.email      
			}, async (err, charge) => {
				if (err) {
					console.log({err});
					return res.json({error: 'Could not charge card'})
				}

				//update purchased item status to 'pendingDate'
				try {
					await order.updateOne({
						status: 'pendingDate'
					})
				} catch {
					return res.json({error: 'error saving new purchase to database. Your card was already charged whooops.'})
				}		
			console.log(req.body);
			res.json({errors: false})
		})
	})
}