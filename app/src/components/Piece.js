import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Navbar from './Navbar';

class Piece extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			text: ''
		}
	}

	render() {
		if (this.props.state === null) {
			return <Redirect to='/collection' />
		}
		console.log(this.props.piece)
		return (
			<div>
			<Navbar />
			<img 
				src={require(`../../public/pieces-images/${this.props.piece.thumbnails[0]}`)}
				alt='piece'		
			/>
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