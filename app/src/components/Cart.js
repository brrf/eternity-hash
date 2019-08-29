import React from 'react';
import Navbar from './Navbar';
import CartItem from './CartItem';	
import Stripe from './Stripe';
import {connect} from 'react-redux';

import '../cart.css'

class Cart extends React.Component {
	constructor(props) {
		super(props);		
	}

	render() {
		let subtotal = 0;
		let shipping = 8;
		let tax;
		return (
			<div>
				<Navbar />
				<div className='cart-component-container'>
					<div className='cart cart-container'>
						{this.props.cart.length > 0
							? this.props.cart.map( (item, index) => {
								if (item === null || !item.piece || !item.piece.thumbnails) return;
								subtotal += item.piece.price
								tax = Math.round((subtotal * 0.08)*100)/100;
								return <CartItem key={index} item={item}  />
							})
							: <p>Cart Empty</p>
						}
					</div>
					<div className='cart-container'>
						<p className='checkout-details-label'>Subtotal:</p><span className='checkout-price-value'>${subtotal}</span>
						<p className='checkout-details-label'>Shipping:</p><span className='checkout-price-value'>${shipping}</span>
						<p className='checkout-details-label'>Estimated Tax:</p><span className='checkout-price-value'>${tax}</span>
						<hr/>
						<p className='checkout-details-label'>Total:</p><span className='checkout-price-value'>${subtotal + shipping + tax}</span>
						<button className='submit-button center' style={{width: '250px'}}>Proceed to 3-Step Checkout</button>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {cart: state.cart.cart};
}

export default connect(mapStateToProps)(Cart);
