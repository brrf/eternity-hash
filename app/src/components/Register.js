import React from 'react';
import {Redirect} from 'react-router-dom'
import Warning from './Warning'

import logo from '../images/logo-192.png'
import '../authenticate.css'

export default class Register extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			formData: {
				username: '',
				password: '',
				password2: '',
				fname: '',
				lname: '',
				email: '',
			},
			errors: [],
			redirect: false
		}
		this.updateUsername = this.updateUsername.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
		this.updatePassword2 = this.updatePassword2.bind(this);
		this.updateFname = this.updateFname.bind(this);
		this.updateLname = this.updateLname.bind(this);
		this.updateEmail = this.updateEmail.bind(this);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({
			errors: []
		})
		fetch('http://localhost:5000/authentication/register', {
			method: 'POST',
			body: JSON.stringify(this.state.formData),
			headers: {"Content-Type": "application/json"},
			mode: 'cors'
		})
			.then(res => res.json())
			.then(resObject => {
				if (resObject.errors) {
					resObject.errors.forEach(error => {
						this.setState({
							errors: [...this.state.errors, error]
							})
					})
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

	updatePassword2 = (e) => {
		this.setState({
			formData: {
				...this.state.formData,
				password2: e.target.value
			}		
		})
	};

	updateFname = (e) => {
		this.setState({
			formData: {
				...this.state.formData,
				fname: e.target.value
			}		
		})
	};

	updateLname = (e) => {
		this.setState({
			formData: {
				...this.state.formData,
				lname: e.target.value
			}		
		})
	};

	updateEmail = (e) => {
		this.setState({
			formData: {
				...this.state.formData,
				email: e.target.value
			}		
		})
	};


	render() {
		if (this.state.redirect) {
       		return <Redirect to={{pathname: '/authentication/login', state: {message: 'You are registered!'}}}/>;
     	}
		return (
			<div className='container'>
			<Warning errors={this.state.errors}/>
			<div className='form-container'>
				<div className='header'>
					<a href='/'><img className='logo' src={logo} style={{width: '40px', height: '40px'}} alt='logo' /></a>
					<h2>Register</h2>
				</div>
			<form onSubmit={this.handleSubmit}>
				<div className='input-section'>
					<label className='input-label long'>Username: </label>
					<br></br>
					<input type="text" name="username" onChange={this.updateUsername} value={this.state.formData.username}/>
					<br></br>
				</div>
				<div className='input-section'>
					<label className='input-label long'>Password:</label>
					<br></br>
					<input type="password" name="password" onChange={this.updatePassword} value={this.state.formData.password}/>
					<br></br>
				</div>
				<div className='input-section'>
					<label className='input-label long'>Verify Password:</label>
					<br></br>
					<input type="password" name="password2" onChange={this.updatePassword2} value={this.state.formData.password2}/>
					<br></br>
				</div>
				<div className='input-section'>
					<label className='input-label long'>First Name:</label>
					<br></br>
					<input type="fname" name="fname" onChange={this.updateFname} value={this.state.formData.fname}/>
					<br></br>
				</div>
				<div className='input-section'>
					<label className='input-label long'>Last Name:</label>
					<br></br>
					<input type="lname" name="lname" onChange={this.updateLname} value={this.state.formData.lname}/>
					<br></br>
				</div>
				<div className='input-section'>
					<label className='input-label long'>E-mail:</label>
					<br></br>
					<input type="email" name="email" onChange={this.updateEmail} value={this.state.formData.email}/>
					<br></br>
				</div>
				<input className='submit-button' type="submit"/>
			</form>
				<p>Already have an account? <a className='toggle-link' href="./login">Login</a></p>
			</div>
			</div>
		)
	};
}