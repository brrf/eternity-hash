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
			shippingOption: 1
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.selectShipping.bind(this);
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

	selectShipping = (e) => {
		console.log(e.target);
		console.log({
			index: e.target.index,
			value: e.target.value,
			type: e.target.type
		})
		this.setState({
			shippingOption: e.target.value
		})
	}

	render () {
		if (this.state.redirect) {
      		return <Redirect to='/' />
  		}
		
		const {item} = this.props;
		const subtotal = item.piece.price;
		const {accountInformation, shippingInformation, shippingRates, taxRate} = this.props.orderDetails;
		const shippingPrice = Number(shippingRates[this.state.shippingOption].amount);
		const tax = taxRate * subtotal;

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
								<p className='payment-details-details'>Shipping: ${shippingPrice}</p>
								<p className='payment-details-details'>Tax: ${tax}</p>
								<hr/>
								<p className='payment-details-title'>Total: ${tax + subtotal + shippingPrice}</p>
								<button onClick={this.handleSubmit} className='submit-button' style={{width: '250px'}}>Complete Payment</button>
							</div>
						</div>
						<div className='cart-container'>
						{
							shippingRates.map((rate, index) => {
								return (
									<div key={rate.amount} className='shipping-rate-container'>
										<input className='shipping-rate-radio' onChange={this.selectShipping} type="radio" name='shipping-rate' value={index} defaultChecked={index === 1} /><span>{rate.provider}: {rate.servicelevel.name}</span><br />
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
