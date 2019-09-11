import React from 'react';
import {connect} from 'react-redux';
import {updateCart} from '../actions/cart';

import formatDate from '../utils/formatDate';

class CartItemSmall extends React.Component {
	constructor (props) {
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
		const {item} = this.props;
		return (
			<div className='cart-piece'>
				<div className='cart-item-image-container'>
					<img 
						className='piece-image-small'
						src={require(`../../public/pieces-images/${item.piece.thumbnails[0]}`)}
						alt='piece'		
					/>
				</div>
				<div className='cart-details-container'>
					<div className='cart-item-date'>{formatDate(item.date)}</div><br/>
					<div className='cart-piece-price value'>${item.piece.price}<span className='cart-piece-price currency'>USD</span></div>
				</div>				
			</div>
		)
	}
}

// function mapStateToProps(state) {
// 	return {cart: state.cart.cart};
// }

export default connect()(CartItemSmall);
