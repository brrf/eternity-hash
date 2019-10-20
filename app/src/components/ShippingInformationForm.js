import React from 'react';
import Warning from './Warning';
import {connect} from 'react-redux';

class ShippingInformationForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: {
				address: '',
				city: '',
				state: '',
				zipcode: '',
				country: 'US'
			},
			errors: []
		}
		this.handleSubmission.bind(this);
		this.updateAddress = this.updateAddress.bind(this);
		this.updateCity = this.updateCity.bind(this);
		this.updateState = this.updateState.bind(this);
		this.updateZipcode = this.updateZipcode.bind(this);
	}

	componentDidMount = () => {
		if (this.props.shippingInformation) {
			console.log(this.props.shippingInformation)
			this.setState({
				formData: {
					address: this.props.shippingInformation.address,
					city: this.props.shippingInformation.city,
					state: this.props.shippingInformation.state,
					zipcode: this.props.shippingInformation.zipcode
				}
			})
		}
	}

	handleSubmission = (e) => {
		e.preventDefault();
		this.setState({
			errors: []
		});
		if (!this.state.formData.address || !this.state.formData.city || !this.state.formData.state || !this.state.formData.zipcode) {
			this.setState({
				errors: ['Please fill out all the required fields']
			})
			return;
		}
		this.props.submitForm(this.state.formData);
	}

	updateAddress = (e) => {
		this.setState({
			formData: {
				...this.state.formData,
				address: e.target.value
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
							<label className='input-label long'>Address:</label>
							<br></br>
							<input type="address" name="address" onChange={this.updateAddress} value={this.state.formData.address}/>
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
						<div style={{fontWeight: 'bold', fontFamily: 'none'}}>* We currently only ship to the US</div>
					</form>
			  	</div>
			</React.Fragment>
		)
	}
}

function mapStateToProps(state) {
	return({
		shippingInformation: state.orderDetails.shippingInformation,
		cart: state.cart,
	});
}

export default connect(mapStateToProps)(ShippingInformationForm);
