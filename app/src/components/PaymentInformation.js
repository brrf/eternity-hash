import React from 'react';
import Stripe from './Stripe';
import {connect} from 'react-redux';

function PaymentInformation (props) {
	let containerClassNames = 'checkout-step-container';
	let clickEvent;
	if (props.checkoutStep !== props.index) {
		containerClassNames = 'checkout-step-container checkout-step-container-inactive'
		clickEvent = () => props.clickEvent(props.index)
	};

	return (
		<div className={containerClassNames} onClick={clickEvent}>
			<div className='checkout-step-label-container'>
					<div className='checkout-step-number-container'><div className='checkout-step-number'>{props.index}</div></div>
					<div className='checkout-step-label'>{props.text}</div>
			</div>
			{props.checkoutStep !== props.index
				? null
				: <Stripe />
			}
		</div>
	)
}

function mapStateToProps(state) {
	return {checkoutStep: state.cart.checkoutStep.currentStep}
}

export default connect(mapStateToProps)(PaymentInformation);