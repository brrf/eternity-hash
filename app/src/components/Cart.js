import React from 'react';
import Navbar from './Navbar';
import CartItemLarge from './CartItemLarge';
import CartItemSmall from './CartItemSmall';	
import Stripe from './Stripe';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import '../cart.css'

class Cart extends React.Component {
	constructor(props) {
		super(props);	
		this.state = {
			redirect: false,
			proceed: false,
			step: 1

		}
		this.handleProceed = this.handleProceed.bind(this);	
	}

	handleProceed = () => {
		this.setState({
			proceed: true
		})
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to='/checkout' />
		}
		let subtotal = 0;
		let shipping = 8.00;
		this.props.cart.forEach( item => subtotal += item.piece.price);
		let tax = Math.round((subtotal * 0.08)*100)/100;

		return (
			<div>
				<Navbar />
				{!this.state.proceed
					?
						<div className='cart-component-container'>
							<div className={'cart-container cart-large'}>
								{this.props.cart.length > 0
									? this.props.cart.map( (item, index) => {
										if (item === null || !item.piece || !item.piece.thumbnails) return;
										return <CartItemLarge key={index} item={item}  />
									})
									: <p>Cart Empty</p>
								}
							</div>
							<div className={'cart-container checkout-details-small'}>
								<p className='checkout-details-label'>Subtotal:</p><span className='checkout-price-value'>${subtotal}</span><br/>
								<p className='checkout-details-label'>Shipping:</p><span className='checkout-price-value'>${shipping}</span><br/>
								<p className='checkout-details-label'>Estimated Tax:</p><span className='checkout-price-value'>${tax}</span><br/>
								<hr/>
								<p className='checkout-details-label'>Total:</p><span className='checkout-price-value'>${subtotal + shipping + tax}</span><br/>
								<button onClick={this.handleProceed} disabled={!this.props.cart.length} className='submit-button' style={{width: '250px'}}>Proceed to 3-Step Checkout</button>
							</div>
						</div>
					: 	<div className='cart-component-container'>
							<div className='cart-container cart-small'>
								{this.props.cart.length > 0
									? this.props.cart.map( (item, index) => {
										if (item === null || !item.piece || !item.piece.thumbnails) return;
										return <CartItemSmall key={index} item={item}  />
									})
									: <p>Cart Empty</p>
								}
							</div>
							<div className='checkout-details-large'>
								<div className='checkout-step-container'>
									<div className='checkout-step-number-container'><div className='checkout-step-number'>1</div></div>
									<div className='checkout-step-label'>Account Information</div>
								</div>
								<div className='checkout-step-container'>
									<div className='checkout-step-number-container'><div className='checkout-step-number'>2</div></div>
									<div className='checkout-step-label'>Shipping Information</div>
								</div>
								<div className='checkout-step-container'>
									<div className='checkout-step-number-container'><div className='checkout-step-number'>3</div></div>
									<div className='checkout-step-label'>Payment Information</div>
								</div>
							</div>
						</div>
				}				
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {cart: state.cart.cart};
}

export default connect(mapStateToProps)(Cart);
