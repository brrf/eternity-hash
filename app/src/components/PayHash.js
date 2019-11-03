import React from "react";
import Navbar from "./Navbar";

import PayHashForm from "./PayHashForm";
import { Elements, StripeProvider } from "react-stripe-elements";

export default class PayHash extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Navbar />
        <StripeProvider apiKey="pk_test_MBRlAb7bEYiivk4yPFdUgGNd00U1dtjalz">
          <div className="example">
            <Elements>
              <PayHashForm />
            </Elements>
          </div>
        </StripeProvider>
      </div>
    );
  }
}

// <StripeProvider apiKey="pk_test_MBRlAb7bEYiivk4yPFdUgGNd00U1dtjalz">
// 		        <div className="example">
// 		          <Elements>
// 		            <CheckoutForm fontSize='14px' purchasedItemId={props.purchasedItemId}/>
// 		          </Elements>
// 		        </div>
// 		    </StripeProvider>
