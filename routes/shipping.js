const shippo = require('shippo')('shippo_test_123829ef0b7d82342424adfab4d13c75f294e16f');
const validateUsAddress = require('../utils/validateUsAddress');

module.exports = function (app) {
	app.post('/shippingrate', (req, res) => {
		const addressFrom  = {
	    "name": "Eternity Hash",
	    "street1": "2138 S Indiana Avenue, 1709",
	    "city": "Chicago",
	    "state": "IL",
	    "zip": "60616",
	    "country": "US"
		};

		const addressTo = {
		    "name": "Unregistered user",
		    "street1": req.body.address,
		    "city": req.body.city,
		    "state": req.body.state,
		    "zip": req.body.zipcode,
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
		}, async function(err, shipment) {
			if(err) {
				res.json({error: 'an error occurred searching for carriers'})
			} else {
				const UsAddress = await validateUsAddress(shipment.address_to);
				if (UsAddress === false) res.json({error: 'Not a valid address'});
				if (UsAddress === null) res.json({error: 'We currently only ship to the US'});
			} 
			res.json({shipment})  
		});	
	})

	app.post('/shippinglabel', (req, res) => {
		shippo.transaction.create({
		    "rate": shipment.rates[1].object_id,
		    "label_file_type": "PDF",
		    "async": false
		}, function(err, transaction) {
		   if (err) {
		   	res.json({error: 'an error occurred making your label'})
		   } else {
		   	res.json(transaction)
		   }
		});
	})	
};