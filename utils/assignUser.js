const UnregisteredCart = require('../schemas/unregistered-cart');
const User = require('../schemas/users');


async function assignUser(req, res) {
	let user;
		//not logged in
		if (!req.user) {
			try {
				//find a user based off ip
				user = await UnregisteredCart.findOne({ip: req.ip});
			} catch {
				return ({error: 'Error with server'});
			}				
		} else {
			try {
				//find a registered user
				user = await User.findById(user._id);
			} catch {
				return ({error: 'Error with server'});
			}	
		}
		if (!user) return ({error: 'Your cart is empty'});
		return user;
}

module.exports = assignUser;