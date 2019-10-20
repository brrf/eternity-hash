import React from 'react';
import formatDate from '../utils/formatDate';

export default class CartItemSmall extends React.Component {
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
