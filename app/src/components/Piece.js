import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Navbar from './Navbar';

import '../piece.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight, faArrowLeft, faCircle} from '@fortawesome/free-solid-svg-icons';

class Piece extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentImage: 0,
		}

		this.decrementImage = this.decrementImage.bind(this);
		this.incrementImage = this.incrementImage.bind(this);
	}

	decrementImage = () => {
		let value;
		if(this.state.currentImage === 0) {
			value = this.props.piece.thumbnails.length - 1
		} else value = this.state.currentImage - 1
		this.setState({
			currentImage: value
		})
	}

	incrementImage = () => {
		let value;
		if(this.state.currentImage === this.props.piece.thumbnails.length - 1) {
			value = 0
		} else value = this.state.currentImage + 1
		this.setState({
			currentImage: value
		})
	}
	

	render() {
		if (this.props.state === null) {
			return <Redirect to='/collection' />
		}

		const hidden = this.props.piece.thumbnails.length === 1 ? 'hidden' : null;

		return (
			<div>
				<Navbar />
				<div className='carousel-container'>
					<div className={`counter-button ${hidden}`} onClick={this.decrementImage}>
						<FontAwesomeIcon icon={faArrowLeft} size='2x' className='arrow' />
					</div>
					<div className='carousel-image-container'>
						<img
							className='current-image' 
							src={require(`../../public/pieces-images/${this.props.piece.thumbnails[this.state.currentImage]}`)}
							alt='current-image'		
						/>
						<div className='image-indicators'>
							{this.props.piece.thumbnails.map( (circle, index) => {
								return (
									<FontAwesomeIcon key={index} icon={faCircle} className={this.state.currentImage === index ? `indicator active ${hidden}` : `indicator ${hidden}`} />
								)	
							})}
						</div>
					</div>
					<div className={`counter-button ${hidden}`} onClick={this.incrementImage}>
						<FontAwesomeIcon icon={faArrowRight} size='2x' className='arrow'/>
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




