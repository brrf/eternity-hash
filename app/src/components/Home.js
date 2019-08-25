import React from 'react';
import artCover from '../images/art-cover.jpg';
import Navbar from './Navbar';
import {connect} from 'react-redux';
import {receiveCart} from '../actions/cart';

class Home extends React.Component {

	componentDidMount() {
		fetch('http://localhost:5000/cart', {
			method: 'GET',
			mode: 'cors',
			credentials: 'include'
		})
		.then(res => res.json())
		.then(resObject => {
			if (resObject.cart === []) {
				return;
			} else {
			//	console.log(typeof resObject.cart[0].date)
				this.props.dispatch(receiveCart(resObject.cart))
			}
		})
	}

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