import React from 'react';
import {connect} from 'react-redux'
import Navbar from './Navbar';
import Carousel from './Carousel';

import '../piece.css'

class Piece extends React.Component {
	constructor(props) {
		super(props);		
	}

	componentDidMount() {
		document.body.style.backgroundImage ="url('/white_wall.png')";
	}

	componentWillUnmount() {
		document.body.style.backgroundImage = '';
	}

	render() {
		// const {piece} = this.props
		const piece = {
			title: 'Woman by the lake',
			price: 12000,
			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste deleniti quas aspernatur omnis quis rem voluptatibus vel explicabo ab laudantium quasi deserunt hic ipsa beatae impedit laborum asperiores sequi, alias!'
		}
		return (
			<div>
				<Navbar />
				<div className='piece-container'>
					<Carousel {...this.props}/>
					<div className='content'>
						<h2>{piece.title}</h2>
					</div>
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
