const UnregisteredCart = require('../schemas/unregistered-cart');
const User = require('../schemas/users');
const Piece = require('../schemas/pieces');
const Order = require('../schemas/order');
const hydratePiece = require('../utils/hydrate-piece');
const assignUser = require('../utils/assignUser');
const stripe = require("stripe")("sk_test_o39Kr0ePiALbt2HfXt9VrZ3s00GgKCxGbX");
const shippo = require('shippo')('shippo_test_123829ef0b7d82342424adfab4d13c75f294e16f');

const calculateDate = require('../utils/calculateDate');
const calculateTax = require('../utils/calculateTax');

module.exports = function (app) {

	app.post('/charge', async (req, res) => {
		const user = await assignUser(req, res);
		if (user.error) return res.json({error: user.error});

		//find order by Id
		let order;
		try {
			order = await Order.findById(req.body.orderId);
			console.log({order})
		} catch {
			return res.json({error: 'Could not find your order'})
		}
		
		//calculate charge amount by iterating through cart. Add charged items to order as you go.		
		let amount = 0;
		try {
			await Promise.all(user.cart.map(async itemRef => {
				const piece = await Piece.findById(itemRef.pieceId);
				if(!piece || !piece.price) return;
				amount += piece.price;
				try {
					await order.updateOne({itemId: itemRef._id});
				} catch {
					return res.json({error: 'Could not add an item to your order'})
				};
			}));
		} catch {
			return res.json({error: 'Error calculating subtotal'})
		}

		//add tax and shipping fee
		const shippingFee = Number(req.body.shippingRate.amount);
		const tax = amount * calculateTax(order.shippingInformation.state);

		amount = amount + shippingFee + tax;

	    await stripe.charges.create({
	      amount: amount * 100,
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

			// transfer purchased items into a) users purchased items and b) items to be processed by admin. Then remove items from user cart
			user.purchasedItems.push(...user.cart);
			user.cart = [];
			await user.save();

			//create the shipping label
			shippo.transaction.create({
		    "rate": req.body.shippingRate.object_id,
		    "label_file_type": "PDF",
		    "async": false
			}, async function(err, transaction) {
			   if (err) {
			   	res.json({error: 'an error occurred making your shipping label'})
			   } else {
			   	try {
			   		await order.updateOne({
			   			shippingLabel: transaction
			   		});
			   		res.json({error: false});
			   	} catch {
			   		res.json({error: 'could not update order with shipping label'})
			   	}
			   }
			});
			
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
			if (!req.body.date || !req.body.message || !req.body.timeZone) {
				return res.json({error: 'Please provide a date, timezone and personalized message'})
			}
			
			const item = {
				message: req.body.message,
				date: calculateDate(req.body.date, req.body.timeZone),
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

	app.route('/checkout')
		.post(async (req, res) => {
			if (req.body.checkoutStep === undefined) {
				return res.json({error: 'This form is not recognized'})
			}
			//checkoutStep0: create orderId, checkoutStep1: update contact info, checkoutStep2: update shipping info
			switch (req.body.checkoutStep) {
				case 0: 
					const user = await assignUser(req, res);
					if (user.error) return res.json({error: user.error});
					try {
						//created a purchased item
						const order = await Order.create({
							item: {
								pieceId: req.body.item.piece._id,
								message: req.body.item.message,
								date: new Date(req.body.item.date)
							}
						})
						return res.json({purchasedItemId: order._id})
					} catch {
						return res.json({error: 'Could not add create order ID'})
					}
				case 1:
					if (!req.body.formData.email || !req.body.formData.fname || !req.body.formData.lname) {
						return res.json({error: 'Must fill out all fields'})
					}
					try {
						//add account information
							await Order.findByIdAndUpdate(req.body.purchasedItemId, {
								accountInformation: {
									email: req.body.formData.email,
									fname: req.body.formData.fname,
									lname: req.body.formData.lname
								},
								status: 'accountInformation'
							})
					} catch {
						return res.json({error: 'Could not add account information to the order'})
					}	
					return res.json({error: null})
				case 2:
					if (!req.body.formData.address || !req.body.formData.city || !req.body.formData.state || !req.body.formData.zipcode) {
						return res.json({error: 'Must fill out all fields'})
					};
					try {
						await Order.findByIdAndUpdate(req.body.purchasedItemId, {
							shippingInformation: {
								address: req.body.formData.address,
								city: req.body.formData.city,
								state: req.body.formData.state,
								zipcode: req.body.formData.zipcode,
								country: req.body.formData.country
							},
							status: 'shippingInformation'
						})
					} catch {
						return res.json({error: 'Error adding shipping information'});
					}
			}
					return res.json({error: null})	
		});

	app.get('/checkout/:purchasedItemId', async (req, res) => {
		try {
			const purchasedItem = await Order.findById(req.params.purchasedItemId);
			return res.json(purchasedItem)
		} catch {
			res.json({error: 'Could not find your purchase in the database'})
		}
		
	})

	app.get('/purchases', async (req, res) => {
		const pendingDate = await Order.find({status: 'pendingDate'});
		const transactionSubmitted = await Order.find({status: 'transactionSubmitted'});
		const transactionConfirmed = await Order.find({status: 'transactionConfirmed'});
		const shipped = await Order.find({status: 'shipped'});
		return res.json({pendingDate, transactionSubmitted, transactionConfirmed, shipped});
	})
}