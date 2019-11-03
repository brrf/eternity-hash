import React from "react";
import { connect } from "react-redux";

import { setCheckoutStep } from "../actions/cart";
import { setShippingInformation } from "../actions/orderDetails";
import ShippingInformationForm from "./ShippingInformationForm";

class ShippingInformation extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = formData => {
    fetch("http://localhost:5000/checkout", {
      method: "POST",
      body: JSON.stringify({
        formData: formData,
        checkoutStep: 2,
        purchasedItemId: this.props.purchasedItemId
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5000"
      },
      mode: "cors",
      credentials: "include"
    })
      .then(res => res.json())
      .then(resObject => {
        if (resObject.error) {
          console.log(resObject.error);
        } else {
          this.props.dispatch(setShippingInformation(formData));
          this.props.dispatch(
            setCheckoutStep({ currentStep: 3, completed: true })
          );
        }
      });
  };

  render() {
    let containerClassNames = "checkout-step-container";
    let clickEvent;
    if (this.props.checkoutStep !== this.props.index) {
      containerClassNames =
        "checkout-step-container checkout-step-container-inactive";
      clickEvent = () => this.props.clickEvent(this.props.index);
    }
    return (
      <div className={containerClassNames} onClick={clickEvent}>
        <div className="checkout-step-label-container">
          <div className="checkout-step-number-container">
            <div className="checkout-step-number">{this.props.index}</div>
          </div>
          <div className="checkout-step-label">{this.props.text}</div>
        </div>
        {this.props.checkoutStep !== this.props.index ? null : (
          <ShippingInformationForm submitForm={this.handleSubmit} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authedUser: state.authedUser.authedUser,
    checkoutStep: state.cart.checkoutStep.currentStep
  };
}

export default connect(mapStateToProps)(ShippingInformation);
