import React from 'react';
import {connect} from 'react-redux';

class Piece extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			text: ''
		}
	}

	render() {
		return (
			<div>Connected</div>
		)
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(Piece);