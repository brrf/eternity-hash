import React from 'react';
import Navbar from './Navbar';
import CartItem from './CartItem';
import CheckoutForm from './CheckoutForm';
import {Elements, StripeProvider} from 'react-stripe-elements';
import {connect} from 'react-redux';

import '../cart.css'

class Cart extends React.Component {
	constructor(props) {
		super(props);		
	}

	render() {
		return (
			<div>
				<Navbar />
				<div className='cart-component-container'>
					<div className='cart container'>
						{this.props.cart.length > 0
							? this.props.cart.map( (item, index) => {
								if (item === null || !item.piece || !item.piece.thumbnails) return;
								return <CartItem key={index} item={item}  />
							})
							: <p>Cart Empty</p>
						}
					</div>
					<div className='checkout-details container'>
						<StripeProvider apiKey="pk_test_MBRlAb7bEYiivk4yPFdUgGNd00U1dtjalz">
					        <div className="example">
					          <h1>React Stripe Elements Example</h1>
					          <Elements>
					            <CheckoutForm cart={this.props.cart}/>
					          </Elements>
					        </div>
					     </StripeProvider>
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
