import React from 'react';
import artCover from '../images/art-cover.jpg';
import Navbar from './Navbar';
import {connect} from 'react-redux';

class Home extends React.Component {
	render() {
		let fname = this.props.fname ? this.props.fname : null;
		return (
			<div>
		        <Navbar />
		        <img src={artCover} style={{width: '100%', height: '700px'}} alt='artistic design'/>
		  	</div>
		)
	}
}

function mapStateToProps(state) {
	const {fname} = state;
	return {fname};
}

export default connect(mapStateToProps)(Home)