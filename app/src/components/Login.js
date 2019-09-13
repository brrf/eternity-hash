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
		this.updateEmail = this.updateEmail.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
		this.loggedIn = this.loggedIn.bind(this);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({
			errors: []
		})
		fetch('http://localhost:5000/authentication/login', {
			method: 'POST',
			body: JSON.stringify(this.state.formData),
			headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost:5000"},
			mode: 'cors',
			credentials: 'include'
		})
			.then(res => res.json())
			.then(resObject => {
				if (resObject.errors) {
					console.log('errors')
				} else {
					this.props.dispatch(handleLoginuser(resObject.user))
					this.setState({
						redirect: true						
					})
				}			
			});
	}

	updateEmail = (e) => {
		this.setState({
			formData: {
				...this.state.formData,
				email: e.target.value
			}		
		})
	};

	updatePassword = (e) => {
		this.setState({
			formData: {
				...this.state.formData,
				password: e.target.value
			}		
		})
	};

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