import React from 'react';
import Stripe from './Stripe'

function PaymentInformation (props) {
	return (
		<div>
		{props.step === props.index
			? <Stripe />
			: <div className='checkout-step-container checkout-step-container-inactive' onClick={() => props.clickEvent(props.index)}>
				<div className='checkout-step-number-container'><div className='checkout-step-number'>{props.index}</div></div>
				<div className='checkout-step-label'>{props.text}</div>
			</div>
		}
		</div>
	)
}

export default PaymentInformation