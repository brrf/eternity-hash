import React from 'react';
import Warning from './Warning';


export default class ShippingInformationForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: {
				address1: '',
				address2: '',
				city: '',
				state: '',
				zipcode: ''
			},
			errors: []
		}
		this.handleSubmission.bind(this);
		this.updateAddress1 = this.updateAddress1.bind(this);
		this.updateAddress2 = this.updateAddress2.bind(this);
		this.updateCity = this.updateCity.bind(this);
		this.updateState = this.updateState.bind(this);
		this.updateZipcode = this.updateZipcode.bind(this);
	}

	handleSubmission = (e) => {
		e.preventDefault();
		this.setState({
			errors: []
		});
		if (!this.state.formData.address1 || !this.state.formData.city || !this.state.formData.state || !this.state.formData.zipcode) {
			this.setState({
				errors: ['Please fill out all the required fields']
			})
			return;
		}
		this.props.submitForm(this.state.formData);
	}

	updateAddress1 = (e) => {
		this.setState({
			formData: {
				...this.state.formData,
				address1: e.target.value
			}		
		})
	};

	updateAddress2 = (e) => {
		this.setState({
			formData: {
				...this.state.formData,
				address2: e.target.value
			}		
		})
	};

	updateCity = (e) => {
		this.setState({
			formData: {
				...this.state.formData,
				city: e.target.value
			}		
		})
	};

	updateState = (e) => {
		this.setState({
			formData: {
				...this.state.formData,
				state: e.target.value
			}		
		})
	};

	updateZipcode = (e) => {
		this.setState({
			formData: {
				...this.state.formData,
				zipcode: e.target.value
			}		
		})
	};

	render () {
		return (
			<React.Fragment>
				<Warning errors={this.state.errors}/>
				<div className='checkout-step-forms-container'>
					<form onSubmit={this.handleSubmission} className='checkout-step-form-container'>
						<div className='input-section'>
							<label className='input-label long'>Address 1:</label>
							<br></br>
							<input type="address1" name="address1" onChange={this.updateAddress1} value={this.state.formData.address1}/>
							<br></br>
						</div>
						<div className='input-section'>
							<label className='input-label long'>Address 2 (Optional):</label>
							<br></br>
							<input type="address2" name="address2" onChange={this.updateAddress2} value={this.state.formData.address2}/>
							<br></br>
						</div>
						<div className='input-section'>
							<label className='input-label long'>City:</label>
							<br></br>
							<input type="city" name="city" onChange={this.updateCity} value={this.state.formData.city}/>
							<br></br>
						</div>
						<div className='input-section'>
							<label className='input-label long'>State:</label>
							<br></br>
							<input type="state" name="state" onChange={this.updateState} value={this.state.formData.state}/>
							<br></br>
						</div>
						<div className='input-section'>
							<label className='input-label long'>Zipcode:</label>
							<br></br>
							<input type="zipcode" name="zipcode" onChange={this.updateZipcode} value={this.state.formData.zipcode}/>
							<br></br>
						</div>
						<input className='submit-button' type="submit" value="Continue"/>
					</form>
			  	</div>
			</React.Fragment>
		)
	}
}
