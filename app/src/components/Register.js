import React from 'react';

import logo from '../images/logo-192.png'
import '../authenticate.css'

export default function Home() {
	return (
		<div className="container">
			<div className="header">
				<a href='/'><img className='logo' src={logo} style={{width: '40px', height: '40px'}} alt='logo' /></a>
				<h2>Register</h2>
			</div>
		
		<form action='./register' method='post' name='register-form'>
			<div className='input-section'>
				<label className='input-label long'>Username: </label>
				<br></br>
				<input type="text" name="username" />
				<br></br>
			</div>
			<div className='input-section'>
				<label className='input-label long'>Password:</label>
				<br></br>
				<input type="password" name="password" />
				<br></br>
			</div>
			<div className='input-section'>
				<label className='input-label long'>Verify Password:</label>
				<br></br>
				<input type="password" name="password2" />
				<br></br>
			</div>
			<div className='input-section'>
				<label className='input-label long'>First Name:</label>
				<br></br>
				<input type="fname" name="fname" />
				<br></br>
			</div>
			<div className='input-section'>
				<label className='input-label long'>Last Name:</label>
				<br></br>
				<input type="lname" name="lname" />
				<br></br>
			</div>
			<div className='input-section'>
				<label className='input-label long'>E-mail:</label>
				<br></br>
				<input type="email" name="email" />
				<br></br>
			</div>
			<input className='submit-button' type="submit" />
		</form>
		<p>Already have an account? <a className='toggle-link' href="./login">Login</a></p>
	</div>
	)
}