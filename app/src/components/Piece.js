import React from 'react';
import {connect} from 'react-redux'
import Navbar from './Navbar';
import Carousel from './Carousel';

class Piece extends React.Component {
	constructor(props) {
		super(props);		
	}

	render() {
		return (
			<div>
				<Navbar />
				<Carousel {...this.props}/>
			</div>
		)
	}
}

export default connect(null)(Piece);
