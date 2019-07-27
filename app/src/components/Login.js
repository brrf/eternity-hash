import React from 'react';
import {Redirect} from 'react-router-dom';
import Warning from './Warning';

import logo from '../images/logo-192.png'
import '../authenticate.css'

export default class Register extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			formData: {
				username: '',
				password: '',
			},
			errors: [],
			redirect: false
		}
		this.updateUsername = this.updateUsername.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({
			errors: []
		})
		fetch('http://localhost:5000/authentication/login', {
			method: 'POST',
			body: JSON.stringify(this.state.formData),
			headers: {"Content-Type": "application/json"},
			mode: 'cors'
		})
			.then(res => res.json())
			.then(resObject => {
				if (resObject.errors) {
					console.log('errors')
					// resObject.errors.forEach(error => {
					// 	this.setState({
					// 		errors: [...this.state.errors, error]
					// 		})
				} else {
					this.setState({
						redirect: true
					})
				}			
			});
	}


	updateUsername = (e) => {
		this.setState({
			formData: {
				...this.state.formData,
				username: e.target.value
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
	render() {
		if (this.state.redirect) {
       		return <Redirect to='/'/>;
     	}
	return (

		<div className='container'>
			{this.props.location.state ? <p className='flash registered'>{this.props.location.state.message}</p> : null}
			<div className='form-container'>
			<div className="header">
				<a href='/'><img className='logo' src={logo} style={{width: '40px', height: '40px'}} alt='logo' /></a>
				<h2>Login</h2>
			</div>
			
			<form onSubmit={this.handleSubmit}>
				<div className='input-section'>
					<label className='input-label'>Username: </label>
					<br></br>
					<input type="text" name="username" value={this.state.formData.username} onChange={this.updateUsername}/>
					<br></br>
				</div>
				<div className='input-section'>
					<label className='input-label'>Password:</label>
					<br></br>
					<input type="password" name="password" value={this.state.formData.password} onChange={this.updatePassword}/>
					<br></br>
				</div>
				<input className='submit-button' type="submit" />
			</form>
			<p>No account? <a className='toggle-link' href="./register">Register</a></p>
		</div>
		</div>
	)}
}