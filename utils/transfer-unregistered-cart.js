const UnregisteredCart = require('../schemas/unregistered-cart');

//when logging in or registering transfer any items in unregistered cart to user cart & clear unregistered cart
async function transferUnregisteredCart (ip) {
	let unregisteredCart = await UnregisteredCart.findOne({ip});
		if (unregisteredCart) {
			await UnregisteredCart.findByIdAndDelete(unregisteredCart._id);
			console.log({returnedObj: unregisteredCart.cart});
			return unregisteredCart.cart;
		}	else {
			return null
		}
};

module.exports = transferUnregisteredCart;