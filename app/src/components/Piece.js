import React from 'react';
import {connect} from 'react-redux'
import Navbar from './Navbar';
import Carousel from './Carousel';
import Checkout from './Checkout';

import '../piece.css'

class Piece extends React.Component {
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
			<div id='parent-container'>
				<Navbar />
				<div className='piece-component-container'>
					<div className='piece-container'>
						<Carousel {...this.props}/>
						<div className='content'>
							<h2>{piece.title}</h2>
							<p className='description'>{piece.description}</p>
							<p className='piece-price'>${piece.price}</p>
						</div>
					</div>
					<Checkout />
				</div>
			</div>
		)
	}
}

function mapStateToProps({collection}, {match}) {
	let piece;
	if (!collection.collection) return {state: null}
	collection.collection.forEach(currentPiece => {
		if (currentPiece._id === match.params.id) {
			piece = currentPiece;
			return;
		} 
	})
	return {piece};
}

export default connect(mapStateToProps)(Piece);
