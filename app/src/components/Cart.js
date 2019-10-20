import React from 'react';
import Navbar from './Navbar';
import CartItemLarge from './CartItemLarge';
import ShippingInformationForm from './ShippingInformationForm'
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {setShippingInformation, setShippingRates} from '../actions/orderDetails';
import getShippingRates from '../utils/getShippingRates';

import '../cart.css'

class Cart extends React.Component {
	constructor(props) {
		super(props);	
		this.state = {
			redirect: false,
			purchasedItemId: null,
			estimateShipping: false,
			shipping: 0
		}
		this.handleRedirect = this.handleRedirect.bind(this);
		this.estimateShipping = this.estimateShipping.bind(this);
	}

	showEstimateShipping = () => {
		this.setState({
			estimateShipping: !this.state.estimateShipping
		})
	}

	estimateShipping = async (address, item) => {
		let rates = await getShippingRates(address, item);
		this.props.dispatch(setShippingRates(rates))
		rates = this.props.rates;
		let lowestRate;
		rates.forEach(rate => {
			const currentRate = Number(rate.amount);
			if (!lowestRate) lowestRate = currentRate;
			if (currentRate < lowestRate) lowestRate = rate.amount;
		})
			this.setState({
				shipping: Number(lowestRate),
				estimateShipping: false
			})
			this.props.dispatch(setShippingInformation(address));
			
	}

	handleRedirect = () => {
		fetch('http://localhost:5000/checkout/', {
			method: 'GET',
			headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost:5000"},
			mode: 'cors',
			credentials: 'include'
		})
			.then(res => res.json())
			.then(resObject => {
				if (resObject.error) {
					console.log(resObject.error)
				} else {
					this.setState({
						purchasedItemId: resObject.purchasedItemId,
						redirect: true
					})
				}			
			});
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to={`/cart/${this.state.purchasedItemId}`} />
		}
		let subtotal = 0;
		this.props.cart.cart.forEach( item => {
			subtotal += item.piece.price;
		});
		const tax = subtotal * 0.08;
		return (
			<div>
				<Navbar />
				<div className='cart-component-container'>
					<div className={'cart-container cart-large'}>
						{this.props.cart.cart.length > 0
							? this.props.cart.cart.map( (item, index) => {
								if (item === null || !item.piece || !item.piece.thumbnails) return null;
								return <CartItemLarge key={index} item={item} />
							})
							: <p>Cart Empty</p>
						}
					</div>
					<div className={'cart-container checkout-details-small'}>
						<p className='checkout-details-label'>Subtotal:</p><span className='checkout-price-value'>${subtotal}</span><br/>
						<p className='checkout-details-label'>Shipping:</p><span onClick={this.showEstimateShipping} className={`checkout-price-value ${this.state.shipping === 0 ? 'checkout-shipping-estimate' : null}`}>{this.state.shipping === 0 ? 'Estimate shipping' : `$${this.state.shipping}`}</span><br/>
						{this.state.estimateShipping 
							? <ShippingInformationForm submitForm={this.estimateShipping} />
							: null
						}
						<p className='checkout-details-label'>Estimated Tax:</p><span className='checkout-price-value'>${tax}</span><br/>
						<hr/>
						<p className='checkout-details-label'>Estimated Total:</p><span className='checkout-price-value'>{Math.round((subtotal + this.state.shipping + tax) *100)/100}</span><br/>
						<button onClick={this.handleRedirect} disabled={!this.props.cart.cart.length} className='submit-button' style={{width: '250px'}}>Proceed to 3-Step Checkout</button>
					</div>
				</div>	
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {cart: state.cart, rates: state.orderDetails.shippingRates};
}

export default connect(mapStateToProps)(Cart);
