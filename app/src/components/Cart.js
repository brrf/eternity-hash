import React from 'react';
import Navbar from './Navbar';
import {connect} from 'react-redux';
import {updateCart} from '../actions/cart';

import '../cart.css'

class Cart extends React.Component {
	constructor(props) {
		super(props);

		this.deleteItem = this.deleteItem.bind(this);
	}

	deleteItem = (itemId) => {

		fetch('http://localhost:5000/cart', {
			method: 'DELETE',
			body: JSON.stringify({itemId}),
			headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost:5000"},
			mode: 'cors',
			credentials: 'include'
		})
			.then(res => res.json())
			.then(resObject => {
				if (resObject.error) {
					console.log(resObject.error);
				} else {
					this.props.dispatch(updateCart(resObject.cart));
				}
			})
	}

	render() {
		return (
			<div>
				<Navbar />
				<div className='cart-component-container'>
					<div className='cart container'>
						{this.props.cart
							? this.props.cart.map( (item, index) => {
								if (item === null || !item.piece || !item.piece.thumbnails) return;
								return (
									<div className='cart-piece'
										 key={index} >
										<img 
											className='piece-image'
											src={require(`../../public/pieces-images/${item.piece.thumbnails[0]}`)}
											alt='piece'		
										/>
										<button onClick={() => this.deleteItem(item.itemId)}>Delete</button>
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
	return {cart: state.cart.cart};
}

export default connect(mapStateToProps)(Cart);
