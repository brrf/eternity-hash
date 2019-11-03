import React from "react";
import CheckoutForm from "./CheckoutForm";
import { Elements, StripeProvider } from "react-stripe-elements";

export default function Stripe(props) {
  return (
    <StripeProvider apiKey="pk_test_MBRlAb7bEYiivk4yPFdUgGNd00U1dtjalz">
      <div className="example">
        <Elements>
          <CheckoutForm
            fontSize="14px"
            purchasedItemId={props.purchasedItemId}
          />
        </Elements>
      </div>
    </StripeProvider>
  );
}
