const Hash = require('../schemas/hash').hash;

const assignUser = require('../utils/assignUser');
const calculateDate = require('../utils/calculateDate');
const calculateTax = require('../utils/calculateTax');

module.exports = function(app) {
	app.route('/hashes')
		.post( async (req, res) => {
			console.log(req.body)
			if (!req.body.date || !req.body.timeZone || !req.body.message) {
				return res.json({error: 'Incomplete form'});
			}
			const date = calculateDate(req.body.date, req.body.timeZone);
			try {
				const hash = await Hash.create({
					date,
					message: req.body.message
				})
				res.json({hash})
			} catch {
				console.log('catch')
			}
		})
}