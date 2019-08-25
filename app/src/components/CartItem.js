import React from 'react';
import {connect} from 'react-redux';
import {updateCart} from '../actions/cart';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';

import formatDate from '../utils/formatDate';

class CartItem extends React.Component {
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
						className='piece-image'
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
						<FontAwesomeIcon icon={faTrashAlt} size='1x' className='cart-action' onClick={() => this.deleteItem(item.itemId)} />
					</div>
					<hr/>
					<div className='cart-item-details-container'>
						<div style={{margin: '5px', fontSize: '19px'}}>{item.message}</div>
						<div style={{fontWeight: 'bold', fontSize: '22px'}}>Date: {formatDate(item.date)}</div>
					</div>
				</div>
				
			</div>
		)
	}
}

// function mapStateToProps(state) {
// 	return {cart: state.cart.cart};
// }

export default connect()(CartItem);
