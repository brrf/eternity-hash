import React from 'react';
import Navbar from './Navbar';
import {connect} from 'react-redux';

import '../cart.css'

class Cart extends React.Component {
	// constructor(props) {
	// 	super(props);

	// 	// this.state = {
	// 	// 	loading: true,
	// 	// 	cart: null
	// 	// }
	// }

	render() {
		return (
			<div>
				<Navbar />
				<div className='cart-component-container'>
					<div className='cart container'>
						{this.props.cart
							? this.props.cart.map( (item, index) => {
								if (item === null) return;
								return (
									<div className='cart-piece'
										 key={index} >
										<img 
											className='piece-image'
											src={require(`../../public/pieces-images/${item.thumbnails[0]}`)}
											alt='piece'		
										/>
									</div>)
								})
							: <p>Cart Empty</p>
						}
					</div>
					<div className='checkout-details container'>Here Too</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	console.log({availableState: state.checkout.cart});
	return {cart: state.checkout.cart};
}

export default connect(mapStateToProps)(Cart);
