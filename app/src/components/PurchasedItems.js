import React from 'react';
import Navbar from './Navbar'
import {connect} from 'react-redux';

class PurchasedItems extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<div>
				<Navbar />
				<div style={{marginTop: '150px'}}>Connected</div>
			</div>
		)
	}
}

export default connect()(PurchasedItems)