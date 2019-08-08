import React from 'react';
import {connect} from 'react-redux'
import Navbar from './Navbar';
import Carousel from './Carousel';

import '../checkout.css'

class Checkout extends React.Component {
	constructor(props) {
		super(props);		
	}
	render() {
		// const {piece} = this.props
		const piece = {
			title: 'Woman by the lake',
			price: 12000,
			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste deleniti quas aspernatur omnis quis rem voluptatibus vel explicabo ab laudantium quasi deserunt hic ipsa beatae impedit laborum asperiores sequi, alias!'
		}
		return (
			<div className='checkout-container'>
				<div className='price-container'>
					<p className='price-label'>PRICE</p>
					<p className='price'>${piece.price}<span className='currency'>USD</span></p>
				</div>
				<hr />
				<form onSubmit={this.submitForm} className='checkout-form'>
					<label className='checkout-input-label'>Date of Event:</label>
					<br />
					<input className='checkout-input' type='date' />
					<br />
					<label className='checkout-input-label'>Please provide a special message:</label>
					<br />
					<input className='checkout-input' type='textarea' />
					<br />
					<input className='submit-button' type='submit' value='Purchase this Piece' />
				</form>
				<hr/>
				<p className='checkout-educational-text'>On the day of your event, we will store a copy of your message on the blockchain. This message will be stored for eternity!</p>
				<p className='checkout-educational-text'>The Bitcoin blockchain will provide a "hash", which can be used to find this message whenever you like. The hash is unique. Another exact hash will never be produced again.</p>
				<p className='checkout-educational-text'>The unique nature of this hash will be infused into your Eternity piece. This will ensure that your Eternity piece will also be one-of-a-kind</p> 

			</div>
		)
	}
}

function mapStateToProps({collection}, {match}) {
	let piece;
	// if (!collection.collection) return {state: null}
	// collection.collection.forEach(currentPiece => {
	// 	if (currentPiece._id === match.params.id) {
	// 		piece = currentPiece;
	// 		return;
	// 	} 
	// })
	return {piece};
}

export default connect(mapStateToProps)(Checkout);
