import React from 'react';
import {connect} from 'react-redux';
import Warning from './Warning';
import {Link, Redirect} from 'react-router-dom';

import handleLoginuser from '../actions/login'

import LoginForm from './LoginForm'

import logo from '../images/logo-192.png'
import '../authenticate.css'

class Login extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			redirect: false,
		}
		this.loggedIn = this.loggedIn.bind(this);
	}

	loggedIn = () => {
		this.setState({
			redirect: true
		})
	}

	render() {
		if (this.state.redirect) {
       		return <Redirect to='/'/>;
     	}
	return (
		<div className='account-container'>
			{this.props.location.state ? <p className='flash registered'>{this.props.location.state.message}</p> : null}
			<div className='form-container'>
				<div className="header">
					<Link to='/'><img className='logo' src={logo} style={{width: '40px', height: '40px'}} alt='logo' /></Link>
					<h2>Login</h2>
				</div>
				<LoginForm success={this.loggedIn}/>
				<p>No account? <Link className='toggle-link' to="./register">Register</Link></p>
			</div>
		</div>
	)}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(Login);