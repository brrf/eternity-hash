const shippo = require('shippo')('shippo_test_123829ef0b7d82342424adfab4d13c75f294e16f');

function validateUsAddress (address) {
	if (address.country !== 'US') {
		return null
	};
	return new Promise((resolve, reject) => {
		shippo.address.validate(address.object_id, function(err, validation) {
			if (err) {
				reject(err)
			} else {
				if (validation.validation_results.is_valid) {
					resolve(true);
				} else resolve(false);
			}
		});
	})
}

module.exports = validateUsAddress;