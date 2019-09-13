import React from 'react';
import Navbar from './Navbar';
import CartItemLarge from './CartItemLarge';
import CartItemSmall from './CartItemSmall';
import AccountInformation from './AccountInformation';
import ShippingInformation from './ShippingInformation';
import PaymentInformation from './PaymentInformation';	
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {setCheckoutStep} from '../actions/cart';

import '../cart.css'

class Cart extends React.Component {
	constructor(props) {
		super(props);	
		this.state = {
			redirect: false,
			proceed: false,
		}
		this.handleProceed = this.handleProceed.bind(this);	
		this.toggleStep = this.toggleStep.bind(this);
	}

	handleProceed = () => {
		this.setState({
			proceed: true
		})
	}

	toggleStep = (currentStep) => {
		if (this.props.cart.checkoutStep.completed + 1 < currentStep) return; 
		this.props.dispatch(setCheckoutStep({currentStep, completed: false}));		
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to='/checkout' />
		}
		let subtotal = 0;
		let shipping = 8.00;
		this.props.cart.cart.forEach( item => subtotal += item.piece.price);
		let tax = Math.round((subtotal * 0.08)*100)/100;

		return (
			<div>
				<Navbar />
				{!this.state.proceed
					?
						<div className='cart-component-container'>
							<div className={'cart-container cart-large'}>
								{this.props.cart.cart.length > 0
									? this.props.cart.cart.map( (item, index) => {
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
								<button onClick={this.handleProceed} disabled={!this.props.cart.cart.length} className='submit-button' style={{width: '250px'}}>Proceed to 3-Step Checkout</button>
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
								<AccountInformation index={1} text='Account Information' clickEvent={this.toggleStep}/>
								<AccountInformation index={2} text='Shipping Information' clickEvent={this.toggleStep}/>
								<AccountInformation index={3} text='Payment Information' clickEvent={this.toggleStep}/>
							</div>
						</div>
				}				
			</div>
		)
	}
}

function mapStateToProps(state) {
	console.log({state});
	return {cart: state.cart};
}

export default connect(mapStateToProps)(Cart);
