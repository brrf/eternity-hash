import React from 'react';
import artCover from '../images/art-cover.jpg';
import Navbar from './Navbar';
import {connect} from 'react-redux';

class Home extends React.Component {
	render() {
		let username = this.props.username ? this.props.username : null;
		return (
			<div>
		        <Navbar username={username}/>
		        <img src={artCover} style={{width: '100%', height: '700px'}} alt='artistic design'/>
		  	</div>
		)
	}
}

function mapStateToProps(state) {
	console.log({state})
	const {username} = state;
	return {username};
}

export default connect(mapStateToProps)(Home)