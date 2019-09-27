import React from 'react';
import Navbar from './Navbar';
import CartItemSmall from './CartItemSmall';
import AccountInformation from './AccountInformation';
import ShippingInformation from './ShippingInformation';
import PaymentInformation from './PaymentInformation';	
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {setCheckoutStep} from '../actions/cart';

import '../cart.css'

class Checkout extends React.Component {
	constructor(props) {
		super(props);	
	}

	toggleStep = (currentStep) => {
		if (this.props.cart.checkoutStep.completed + 1 < currentStep) return; 
		this.props.dispatch(setCheckoutStep({currentStep, completed: false}));		
	}

	render() {
		return (
			<div>
				<Navbar />
				<div className='cart-component-container'>
					<div className='cart-container cart-small'>
						{this.props.cart.cart.length > 0
							? this.props.cart.cart.map( (item, index) => {
								if (item === null || !item.piece || !item.piece.thumbnails) return;
								return <CartItemSmall key={index} item={item}  />
							})
							: <p>Cart Empty</p>
						}
					</div>
					<div className='checkout-details-large'>
						<AccountInformation index={1} text='Account Information' clickEvent={this.toggleStep} purchasedItemId={this.props.match.params.id} />
						<ShippingInformation index={2} text='Shipping Information' clickEvent={this.toggleStep} purchasedItemId={this.props.match.params.id} />
						<PaymentInformation index={3} text='Payment Information' clickEvent={this.toggleStep}/>
					</div>
				</div>				
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {cart: state.cart};
}

export default connect(mapStateToProps)(Checkout);
