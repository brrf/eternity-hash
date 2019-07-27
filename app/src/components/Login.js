import React from 'react';

import logo from '../images/logo-192.png'
import '../authenticate.css'

export default function Login() {
	return (
		<div className="container">
			<div className="header">
				<a href='/'><img className='logo' src={logo} style={{width: '40px', height: '40px'}} alt='logo' /></a>
				<h2>Login</h2>
			</div>
			
			<form action='./login' method='post' name='login-form'>
				<div className='input-section'>
					<label className='input-label'>Username: </label>
					<br></br>
					<input type="text" name="username" />
					<br></br>
				</div>
				<div className='input-section'>
					<label className='input-label'>Password:</label>
					<br></br>
					<input type="password" name="password" />
					<br></br>
				</div>
				<input className='submit-button' type="submit" />
			</form>
			<p>No account? <a className='toggle-link' href="./register">Register</a></p>
		</div>
	)
}