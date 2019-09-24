const UnregisteredCart = require('../schemas/unregistered-cart');
const User = require('../schemas/users');
const Piece = require('../schemas/pieces');
const PurchasedItem = require('../schemas/purchaseditems');
const hydratePiece = require('../utils/hydrate-piece');
const stripe = require("stripe")("sk_test_o39Kr0ePiALbt2HfXt9VrZ3s00GgKCxGbX");

module.exports = function (app) {

	app.post('/charge', async (req, res) => {
		if (!req.user) {
			return res.json({error: false, redirect: '/authentication/register'})
		}
		let amount = 0;
		await Promise.all(req.user.cart.map(async itemRef => {
			const piece = await Piece.findById(itemRef.pieceId);
			if(!piece || !piece.price) return;
			amount += piece.price;
		}));
	    await stripe.charges.create({
	      amount: amount * 100,
	      currency: "usd",
	      description: "An example charge",
	      source: req.body.id
		}, async (err, charge) => {
			if (err) {
				console.log({err});
				return res.json({error: 'Could not charge card'})
			}

			// transfer purchased items into a) users purchased items and b) items to be processed by admin. Then remove items from user cart
			let user = await User.findById(req.user._id);
			user.purchasedItems.push(...user.cart);
			user.cart = [];
			await user.save();
			res.json({error: false, redirect: 'purchaseditems'});
		});
	})

	app.route('/cart')
		.get(async (req, res) => {
			let cart = [];
			//if not logged in, check the ip address for a mongoDB cart
			if (!req.user) {
				try {
					const cartObj = await UnregisteredCart.findOne({ip: req.ip});
					if (!cartObj) return res.json({cart: []})
					else {
						await Promise.all(cartObj.cart.map( async itemRef => {
							const piece = await Piece.findById(itemRef.pieceId);
							cart.push({
								piece,
								message: itemRef.message,
								date: itemRef.date,
								itemId: itemRef._id
							});
						}));
					}
				} catch {
					console.log('error finding unregistered cart')
				}
			} else {
			//if user logged in, lookup their cart
				try {
					if (req.user.cart === []) return res.json({cart: []});
					else {
						await Promise.all(req.user.cart.map( async itemRef => {
							const piece = await Piece.findById(itemRef.pieceId);
								cart.push({
								piece,
								message: itemRef.message,
								date: itemRef.date,
								itemId: itemRef._id
							});
						}));
					}
				} catch {
					console.log('error finding registered cart')
				}
			}
			res.json({cart})
		})
		.post(async (req, res) => {
			if (!req.body.date || !req.body.message) {
				return res.json({error: 'Please provide a date and personalized message'})
			}
			const item = {
				message: req.body.message,
				date: req.body.date,
				pieceId: req.body.pieceId
			}
			//if logged in, add item to their cart
			if (req.user) {
				try {
					await User.findByIdAndUpdate(req.user._id, {
					$push: {cart: item}
					})
				} catch {
					return res.json({error: 'error saving item to registered cart'})
				}	
			//if not logged in, associate item with their ip address in mongodb		
			} else if (req.ip) {		
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
			}
			//return object containing full piece, message and date
			try {
				item.piece = await hydratePiece(req.body.pieceId);
				delete item.pieceId;
				return res.json({item, error: null})
			} catch {
				return res.json({error: 'could not return the full piece'})
			}
		})
		.delete(async (req, res) => {
			let newCart = [];
			function deleteCartItem (err, user, itemId) {
				if (err) {
						return res.json({error: 'An error occurred with your account'});
					} else if (!user) {
						return res.json({error: 'This user does not seem to exist'})
					} else {
						user.cart = user.cart.filter(item => item._id != itemId);
						user.save();
						return user.cart;
					}
			}
			if (req.user) {
				await User.findById(req.user._id, function (err, user) {
					newCart = deleteCartItem(err, user, req.body.itemId);
				})
			} else {
				await UnregisteredCart.findOne({ip: req.ip}, function (err, user) {
					newCart = deleteCartItem(err, user, req.body.itemId);
				})
			}
			return res.json({error: null});
		})

	app.route('/purchases/accountinformation')
		.post(async (req, res) => {
			if (!req.body.email || !req.body.fname || !req.body.lname) {
				return res.json({error: 'Must fill out all fields'})
			}
			let cartItem;
			if (!req.user) {
				const cartObj = await UnregisteredCart.findOne({ip: req.ip});
				if (!cartObj) return res.json({error: 'Your cart is empty'});
				cartItem = cartObj.cart
			}
			try {
				await PurchasedItem.create({
					date: cartItem[0].date,
					message: cartItem[0].message,
					pieceId: cartItem[0].pieceId,
					accountInformation: {
						email: req.body.email,
						fname: req.body.fname,
						lname: req.body.lname
					}
				})
			} catch {
				return res.json({error: 'Could not add account information to the order'})
			}		
			res.json({error: null})
		})
}