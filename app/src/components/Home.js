import React from 'react';
import artCover from '../images/art-cover.jpg';
import Navbar from './Navbar';
import {connect} from 'react-redux';

class Home extends React.Component {
	render() {
		return (
			<div>
		        <Navbar />
		        <img src={artCover} style={{width: '100%', height: '700px'}} alt='artistic design'/>
		        <div style={{width: '100%', height: '1000px', color: 'grey'}}></div>
		  	</div>
		)
	}
}

export default connect()(Home)