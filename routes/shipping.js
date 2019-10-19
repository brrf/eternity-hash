const shippo = require('shippo')('shippo_test_123829ef0b7d82342424adfab4d13c75f294e16f');

module.exports = function (app) {
	app.get('/shipping', (req, res) => {
		const addressFrom  = {
	    "name": "Moshe Praver",
	    "street1": "2138 S Indiana Avenue, 1709",
	    "city": "Chicago",
	    "state": "IL",
	    "zip": "60616",
	    "country": "US"
		};

		const addressTo = {
		    "name": "Elizabeth Harris",
		    "street1": "8014 N Pennsylvania St",
		    "city": "Indianapolis",
		    "state": "IN",
		    "zip": "46240",
		    "country": "US"
		};

		const parcel = {
		    "length": "5",
		    "width": "5",
		    "height": "5",
		    "distance_unit": "in",
		    "weight": "2",
		    "mass_unit": "lb"
		};

		shippo.shipment.create({
		    "address_from": addressFrom,
		    "address_to": addressTo,
		    "parcels": [parcel],
		    "async": false
		}, function(err, shipment) {
			if(err) {
				res.json({error: 'an error occurred'})
			} else {
				res.json({shipment})
			}   
		});	
	})	
};