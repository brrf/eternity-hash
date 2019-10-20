import React from 'react';
import Navbar from './Navbar';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import formatDate from '../utils/formatDate';

class FinalizePayment extends React.Component {
	constructor(props) {
		super(props);	
		this.state = {
			redirect: false,
		}
		this.handleSubmit = this.handleSubmit.bind(this);	
	}

	handleSubmit = async () => {
		await fetch("http://localhost:5000/charge", {
	      method: "POST",
	      headers: {"Content-Type": "application/json"},
	      body: JSON.stringify({
	      	id: this.props.location.state.stripeToken, 
	      	orderDetails: this.props.orderDetails, 
	      	purchasedItemId: this.props.location.state.purchasedItemId
	      }),
	      mode: 'cors',
	      credentials: 'include'
	    })
	      .then(res => res.json())
	      .then(resObject => {
	        resObject.error
	          ? console.log(resObject.error)
	          : this.setState({
	            redirect: true
	          })
	     });
	}

	render () {
		if (this.state.redirect) {
      		return <Redirect to='/' />
  		}


  	const item = JSON.parse(JSON.stringify({
  "item": {
    "piece": {
      "thumbnails": [
        "images-1566742457955.jpeg"
      ],
      "_id": "5d6297b90e6dcb3866ea87d3",
      "title": "Bridal Hat",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dignissim, dolor id pellentesque ornare, turpis ante tempus neque, ac consequat odio ante at elit. Ut suscipit laoreet tortor, et porta ex volutpat ac. Praesent ac augue quis ante mattis auctor id ut libero. Suspendisse porta commodo erat, cursus ornare turpis mattis ut. Maecenas semper felis ac interdum tempor. Ut faucibus ipsum vitae placerat vulputate. Proin rhoncus felis nec lacus cursus mattis. In sed tellus tincidunt libero placerat iaculis in dignissim ligula. Ut tempus posuere nisl a finibus. Nunc nunc tortor, ultrices vulputate tempor iaculis, venenatis non ipsum. Aliquam tempus magna non sem maximus, a feugiat odio tempor. Morbi odio libero, porttitor vitae sollicitudin id, molestie aliquam eros.",
      "price": 400,
      "artist": "Veronica Penelope",
      "__v": 0
    },
    "message": "asdf",
    "date": "2019-10-20T10:56:54.865Z",
    "itemId": "5dac9feaf64bd7a84e662194"
  }
})).item
  	console.log({item});


const {accountInformation, shippingInformation, shippingRates} = JSON.parse(JSON.stringify({
  "accountInformation": {
    "email": "moshepraver@gmail.com",
    "fname": "Moshe",
    "lname": "Praver"
  },
  "shippingInformation": {
    "address": "7200 N College Ave",
    "city": "Indianapolis",
    "state": "IN",
    "zipcode": "46240",
    "country": "US"
  },
  "shippingRates": [
    {
      "object_created": "2019-10-20T22:09:45.822Z",
      "object_id": "5bf9be286f5348b0a12f365006647f06",
      "object_owner": "moshepraver@gmail.com",
      "shipment": "67524656b70c4f4489a95b07f30e9785",
      "attributes": [
        "FASTEST"
      ],
      "amount": "22.78",
      "currency": "USD",
      "amount_local": "22.78",
      "currency_local": "USD",
      "provider": "USPS",
      "provider_image_75": "https://shippo-static.s3.amazonaws.com/providers/75/USPS.png",
      "provider_image_200": "https://shippo-static.s3.amazonaws.com/providers/200/USPS.png",
      "servicelevel": {
        "name": "Priority Mail Express",
        "token": "usps_priority_express",
        "terms": ""
      },
      "estimated_days": 1,
      "arrives_by": null,
      "duration_terms": "Overnight delivery to most U.S. locations.",
      "messages": [],
      "carrier_account": "464727400e4b46238c5c534ddff27439",
      "test": true,
      "zone": "2"
    },
    {
      "object_created": "2019-10-20T22:09:45.821Z",
      "object_id": "a645cbd9fb37419ca5b3ad2fb511d9c1",
      "object_owner": "moshepraver@gmail.com",
      "shipment": "67524656b70c4f4489a95b07f30e9785",
      "attributes": [
        "BESTVALUE",
        "CHEAPEST"
      ],
      "amount": "6.95",
      "currency": "USD",
      "amount_local": "6.95",
      "currency_local": "USD",
      "provider": "USPS",
      "provider_image_75": "https://shippo-static.s3.amazonaws.com/providers/75/USPS.png",
      "provider_image_200": "https://shippo-static.s3.amazonaws.com/providers/200/USPS.png",
      "servicelevel": {
        "name": "Priority Mail",
        "token": "usps_priority",
        "terms": ""
      },
      "estimated_days": 2,
      "arrives_by": null,
      "duration_terms": "Delivery within 1, 2, or 3 days based on where your package started and where it’s being sent.",
      "messages": [],
      "carrier_account": "464727400e4b46238c5c534ddff27439",
      "test": true,
      "zone": "2"
    },
    {
      "object_created": "2019-10-20T22:09:45.820Z",
      "object_id": "99a76b63c1294f70957c61dc110ac400",
      "object_owner": "moshepraver@gmail.com",
      "shipment": "67524656b70c4f4489a95b07f30e9785",
      "attributes": [],
      "amount": "7.32",
      "currency": "USD",
      "amount_local": "7.32",
      "currency_local": "USD",
      "provider": "USPS",
      "provider_image_75": "https://shippo-static.s3.amazonaws.com/providers/75/USPS.png",
      "provider_image_200": "https://shippo-static.s3.amazonaws.com/providers/200/USPS.png",
      "servicelevel": {
        "name": "Parcel Select",
        "token": "usps_parcel_select",
        "terms": ""
      },
      "estimated_days": 7,
      "arrives_by": null,
      "duration_terms": "Delivery in 2 to 8 days.",
      "messages": [],
      "carrier_account": "464727400e4b46238c5c534ddff27439",
      "test": true,
      "zone": "2"
    }
  ]
}));




//		const {item} = this.props;
		const subtotal = item.piece.price;
		let tax = subtotal * 0.08;
		//const {accountInformation, shippingInformation, shippingRates} = this.props.orderDetails;
		const shipping = 0;
		console.log(shippingRates);
		return (
			<React.Fragment>
				<Navbar />
				<div className='cart-component-container'>
					<div className='checkout-details-large finalize-payment-details-container'>
						<div className='checkout-step-label'>Review your order</div>
						<div className='cart-container'>
							<div className='cart-piece'>
								<div className='cart-item-image-container'>
									<img 
										className='piece-image-large'
										src={require(`../../public/pieces-images/${item.piece.thumbnails[0]}`)}
										alt='piece'		
									/>
								</div>
								<div className='cart-details-container'>
									<div className='cart-piece-details-container'>
										<div className='cart-piece-details'>
											<div className='cart-piece-title'>{item.piece.title}</div>
											<div>By <span className='cart-piece-artist'>{item.piece.artist}</span></div>
										</div>
									</div>
									<hr/>
									<div className='cart-item-details-container'>
										<div className='cart-item-message'>{item.message}</div>
										<div className='cart-item-bottom'>
											<div className='cart-item-date'>Date: {formatDate(item.date)}</div>
										</div>
									</div>
								</div>				
							</div>
						</div>
						<div className='cart-container'>
							<div className='payment-details-container'>
								<div className='payment-details-section'>
									<div className='payment-details-title'>Shipping Address</div>
									<div className='payment-details-details-container'>
										<div className='payment-details-details'>{`${accountInformation.fname} ${accountInformation.lname}`}</div>
										<div className='payment-details-details'>{shippingInformation.address}</div>
										<div className='payment-details-details'>{`${shippingInformation.city}, ${shippingInformation.state} ${shippingInformation.zipcode}`}</div>
									</div>
								</div>
								<div className='payment-details-section'>
									<div className='payment-details-title'>Payment Method</div>
									<div className='payment-details-details-container'>
										<div className='payment-details-details'>{`${this.props.location.state.card.brand} ending in ${this.props.location.state.card.last4}`}</div>
									</div>
								</div>								
							</div>
						</div>
					</div>
					<div className='finalize-payment-payment-container'>
						<div className='cart-container'>
							<div className='payment-details-title'>Billing Summary</div>
							<div className='payment-details-details-container'>
								<p className='payment-details-details'>Subtotal: ${subtotal}</p>
								<p className='payment-details-details'>Shipping: ${shipping}</p>
								<p className='payment-details-details'>Estimated tax: ${tax}</p>
								<hr/>
								<p className='payment-details-title'>Total: ${tax + subtotal + shipping}</p>
								<button onClick={this.handleSubmit} className='submit-button' style={{width: '250px'}}>Complete Payment</button>
							</div>
						</div>
						<div className='cart-container'>
						{
							shippingRates.map((rate, index) => {
								return (
									<div className='shipping-rate-container'>
										<input className='shipping-rate-radio' type="radio" name='shipping-rate' value={rate.amount} key={rate.amount} checked /><span>{rate.provider}: {rate.servicelevel.name}</span><br />
										<div className='shipping-rate-details'>
											<div>${rate.amount} - Estimated Days: {rate.estimated_days}</div>
										</div>
									</div>
								)
							})
						}
						</div>
					</div>
				</div>
			</React.Fragment>
		)
	}
};

function mapStateToProps(state) {
	return {
		item: state.cart.cart[0], 
		orderDetails: state.orderDetails,
		};
};

export default connect(mapStateToProps)(FinalizePayment);
