import React from 'react';
import Navbar from './Navbar';
import {connect} from 'react-redux';
import CartItemLarge from './CartItemLarge';

import formatDate from '../utils/formatDate';

class FinalizePayment extends React.Component {
	constructor(props) {
		super(props);	
		this.state = {
			redirect: false,
		}
		this.handleRedirect = this.handleRedirect.bind(this);	
	}

	handleRedirect = async () => {
		await fetch("http://localhost:5000/charge", {
	      method: "POST",
	      headers: {"Content-Type": "application/json"},
	      body: JSON.stringify({id: this.props.location.state.stripeToken, orderDetails: this.props.orderDetails}),
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
		const {item} = this.props;
		const {accountInformation, shippingInformation} = this.props.orderDetails;
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
										<div className='payment-details-details'>{shippingInformation.address1}</div>
										{shippingInformation.address2
											? <div className='payment-details-details'>{shippingInformation.address2}</div>
											: null
										}
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
				</div>
			</React.Fragment>
		)
	}
};

function mapStateToProps(state) {
	return {item: state.cart.cart[0], orderDetails: state.orderDetails};
};

export default connect(mapStateToProps)(FinalizePayment);
