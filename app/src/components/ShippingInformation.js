import React from 'react';
import {connect} from 'react-redux';
import Warning from './Warning'

import {setCheckoutStep} from '../actions/cart';
import {setShippingInformation} from '../actions/orderDetails';

class ShippingInformation extends React.Component {
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

		this.handleSubmit = this.handleSubmit.bind(this);
		this.updateAddress1 = this.updateAddress1.bind(this);
		this.updateAddress2 = this.updateAddress2.bind(this);
		this.updateCity = this.updateCity.bind(this);
		this.updateState = this.updateState.bind(this);
		this.updateZipcode = this.updateZipcode.bind(this);
	}

	handleSubmit = (e) => {
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
		fetch('http://localhost:5000/checkout', {
			method: 'POST',
			body: JSON.stringify({
				formData: this.state.formData, 
				checkoutStep: 2, 
				purchasedItemId: this.props.purchasedItemId
			}),
			headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost:5000"},
			mode: 'cors',
			credentials: 'include'
		})
			.then(res => res.json())
			.then(resObject => {
				if (resObject.error) {
					console.log(resObject.error)
				} else {
					this.props.dispatch(setShippingInformation(this.state.formData));
					this.props.dispatch(setCheckoutStep({currentStep: 3, completed: true}));
				}			
			});
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

	render() {
		let containerClassNames = 'checkout-step-container';
		let clickEvent;
		if (this.props.checkoutStep !== this.props.index) {
			containerClassNames = 'checkout-step-container checkout-step-container-inactive'
			clickEvent = () => this.props.clickEvent(this.props.index)
		}
		return (
			<div className={containerClassNames} onClick={clickEvent}>
				<Warning errors={this.state.errors}/>
				<div className='checkout-step-label-container'>
					<div className='checkout-step-number-container'><div className='checkout-step-number'>{this.props.index}</div></div>
					<div className='checkout-step-label'>{this.props.text}</div>
				</div>
				{this.props.checkoutStep !== this.props.index
					?  null		
					: <React.Fragment>
						<div className='checkout-step-forms-container'>
							<form onSubmit={this.handleSubmit} className='checkout-step-form-container'>
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
				}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {authedUser: state.authedUser.authedUser, checkoutStep: state.cart.checkoutStep.currentStep}
}

export default connect(mapStateToProps)(ShippingInformation)

