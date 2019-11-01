import React from 'react';
import Warning from './Warning';

import DatePicker from "react-datepicker";
import TimezonePicker from 'react-bootstrap-timezone-picker';

export default class scheduleHashForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: {
				date: new Date(),
				timeZone: '',
				message: '',
			},
			errors: [],
		}
		this.changeDate = this.changeDate.bind(this);
		this.changeMessage = this.changeMessage.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.changeTimeZone = this.changeTimeZone.bind(this);
	}

	submitForm = (e) => {
		this.setState({
			errors: []
		})
		if (!this.state.formData.date || !this.state.formData.timeZone || !this.state.formData.message) {
			this.setState({
				errors: ['Please fill out all fields']
			})
		}
		//Add item to cart in mongoDb
		e.preventDefault();
		fetch('http://localhost:5000/hashes', {
			method: 'POST',
			body: JSON.stringify(this.state.formData),
			headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost:5000"},
			mode: 'cors',
			credentials: 'include'
		})
		.then(res => res.json())
		.then(resObject => {
			this.props.redirect(resObject.id)
		})
	}

	changeDate = date => {
		this.setState({
			formData: {
				...this.state.formData,
				date
			}		
		});
	};

	changeTimeZone(timeZone) {
	    this.setState({ 
	    	formData: {
	    		...this.state.formData,
	    		timeZone
	    	}
	    })
	}

	changeMessage = e => {
		this.setState({
			formData: {
				...this.state.formData,
				message: e.target.value
			}			
		});
	};

	render () {		
		return (
			<form onSubmit={this.submitForm} className='cart-form'>
				<Warning errors={this.state.errors}/>
				<label className='cart-input-label'>Date of Event:</label>
				<br />
			    <DatePicker
			        selected={this.state.formData.date}
			        onChange={this.changeDate}
			    />
			    <br />
			    <label className='cart-input-label'>Time zone:</label>			   
		        <TimezonePicker
		          placeholder   = "Select your timezone"
		          onChange      = {this.changeTimeZone}
		          absolute      = {true}
		          value         = {this.state.timeZone}
		        />
				<label className='cart-input-label'>Please provide a special message:</label>
				<br />
				<textarea className='cart-input' style={{width: '200px', height: '85px'}} value={this.state.formData.message} onChange={this.changeMessage}/>
				<br />
				<input className='submit-button' type='submit' value='Submit' />
			</form>
		)
	}
}