import React from 'react';

function AccountInformation (props) {
	console.log(props.index);
	return (
		<div>
		{props.step === props.index
			? <div style={{width: '100%', height: '200px', backgroundColor: 'crimson'}}></div>
			: <div className='checkout-step-container' onClick={() => props.clickEvent(props.index)}>
				<div className='checkout-step-number-container'><div className='checkout-step-number'>{props.index}</div></div>
				<div className='checkout-step-label'>{props.text}</div>
			  </div>
		}
		</div>
	)
}

export default AccountInformation