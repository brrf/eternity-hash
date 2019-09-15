import React from 'react';
import {connect} from 'react-redux';
import Warning from './Warning';
import {Link, Redirect} from 'react-router-dom';

import handleLoginuser from '../actions/login'

import logo from '../images/logo-192.png'
import '../authenticate.css'

class LoginForm extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			formData: {
				email: '',
				password: '',
			},
			errors: [],
		}
		this.updateEmail = this.updateEmail.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({
			errors: []
		})
		if (!this.state.formData.email || !this.state.formData.password) {
			this.setState({
				errors: [...this.state.errors, 'Please fill out all fields']
			})
			return;
		}
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
					this.props.dispatch(handleLoginuser(resObject.user));
					this.props.success();
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
	render() {
		return (
			<React.Fragment>
				<Warning errors={this.state.errors}/>
				{this.props.authedUser
					? <div>Logged in as {this.props.authedUser}</div>
					:<form onSubmit={this.handleSubmit}>
						<div className='input-section'>
							<label className='input-label'>E-mail: </label>
							<br></br>
							<input type="text" name="email" value={this.state.formData.email} onChange={this.updateEmail}/>
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
				}
			</React.Fragment>
		)
	}
}

function mapStateToProps(state) {
	let authedUser = state.authedUser.authedUser ? state.authedUser.authedUser.fname : null 
	return {authedUser};
}

export default connect(mapStateToProps)(LoginForm);

