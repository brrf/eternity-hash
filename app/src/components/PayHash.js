import React from 'react';
import Navbar from './Navbar';

import {Elements, StripeProvider} from 'react-stripe-elements';

export default class PayHash extends React.Component {
	constructor(props) {
		super(props);
	}
	render () {
		console.log('here');
		return (
			<div>
				<Navbar />
				<div>Hello</div>
			</div>
		)	
	}
	
}

// <StripeProvider apiKey="pk_test_MBRlAb7bEYiivk4yPFdUgGNd00U1dtjalz">
// 		        <div className="example">
// 		          <Elements>
// 		            <CheckoutForm fontSize='14px' purchasedItemId={props.purchasedItemId}/>
// 		          </Elements>
// 		        </div>
// 		    </StripeProvider>