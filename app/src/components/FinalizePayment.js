import React from 'react';
import Navbar from './Navbar';
import {connect} from 'react-redux';

class FinalizePayment extends React.Component {
	constructor(props) {
		super(props);	
		this.state = {
			redirect: false,
		}
		this.handleRedirect = this.handleRedirect.bind(this);	
	}

	handleRedirect = async () => {
		await fetch("http://localhost:5000/charge", {
	      method: "POST",
	      headers: {"Content-Type": "application/json"},
	      body: JSON.stringify({id: this.props.stripeToken}),
	      mode: 'cors',
	      credentials: 'include'
	    })
	      .then(res => res.json())
	      .then(resObject => {
	        resObject.error
	          ? console.log(resObject.error)
	          : this.setState({
	            redirect: true
	          })
	     });
	}

	render () {
		return (
			<React.Fragment>
				<Navbar />
				<button style={{marginTop: '200px'}} onSubmit={this.handleRedirect}>Hello there</button>
			</React.Fragment>
		)
	}
};

function mapStateToProps(state) {
	return {cart: state.cart};
};

export default connect(mapStateToProps)(FinalizePayment);
