import React from 'react';
import {connect} from 'react-redux'
import Navbar from './Navbar';
import Carousel from './Carousel';
import AddToCart from './AddToCart';

import '../piece.css'

class Piece extends React.Component {
	// constructor(props) {
	// 	super(props);		
	// }
	render() {
		const {piece} = this.props

		return (
			<div id='parent-container'>
				<Navbar />
				<div className='piece-component-container'>
					<div className='piece-container'>
						<Carousel {...this.props}/>
						<div className='content'>
							<h2>{piece.title}</h2>
							<p className='description'>{piece.description}</p>
						</div>
					</div>
					<AddToCart {...this.props}/>
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
