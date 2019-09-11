import React from 'react';

class AccountInformation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: {
				email: '',
				fname: '',
				lname: ''
			}
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.updateFname = this.updateFname.bind(this);
		this.updateLname = this.updateLname.bind(this);
		this.updateEmail = this.updateEmail.bind(this);
	}

	handleSubmit = () => {
		console.log('here');
	}

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
		return (
			<div>
			{this.props.step === this.props.index
				? 
					<form className='checkout-step-container checkout-step-container-active' onSubmit={this.handleSubmit}>
						<div className='checkout-step-number-container'><div className='checkout-step-number'>{this.props.index}</div></div>
						<div>
							<div className='input-section'>
								<label className='input-label long'>E-mail:</label>
								<br></br>
								<input type="email" name="email" onChange={this.updateEmail} value={this.state.formData.email}/>
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
							<input className='submit-button' type="submit" value="Continue"/>
						</div>
					</form>
				: <div className='checkout-step-container checkout-step-container-inactive' onClick={() => this.props.clickEvent(this.props.index)}>
					<div className='checkout-step-number-container'><div className='checkout-step-number'>{this.props.index}</div></div>
					<div className='checkout-step-label'>{this.props.text}</div>
				  </div>
			}
			</div>
		)
	}
}

export default AccountInformation