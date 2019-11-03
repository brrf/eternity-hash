import React from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from "react-stripe-elements";
import getShippingRates from "../utils/getShippingRates";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SelectUSState from "react-select-us-states";
import { setTaxRate } from "../actions/orderDetails";
import formatDate from "../utils/formatDate";
import Warning from "./Warning";
import "../hashes.css";
import "../cart.css";

class PayHashForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stripeToken: null,
      card: null,
      tax: null,
      errors: []
    };

    this.submit = this.submit.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  createOptions = (fontSize, padding) => {
    return {
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          },
          padding
        },
        invalid: {
          color: "#9e2146"
        }
      }
    };
  };

  updateState = state => {
    if (state === "IL") {
      this.setState({
        tax: 2.05
      });
    } else {
      this.setState({
        tax: 0.0
      });
    }
  };

  async submit(ev) {
    ev.preventDefault();
    this.setState({
      errors: []
    });
    if (this.state.tax === null) {
      this.setState({
        errors: [
          ...this.state.errors,
          "Please select billing state for tax purposes"
        ]
      });
    }
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    if (!token) {
      this.setState({
        errors: [...this.state.errors, "Error charging card"]
      });
      return;
    }
    await fetch(`http://localhost:5000/hashes/${this.props.hashObject._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stripeToken: token,
        tax: this.state.tax
      }),
      mode: "cors",
      credentials: "include"
    })
      .then(res => res.json())
      .then(resObject => {
        console.log("here");
      });
  }

  render() {
    let { hashObject } = this.props;
    // hashObject = {
    //   date: "2019-11-01T11:04:17.166Z",
    //   message: "box-sizing: border-box;",
    //   status: "created",
    //   _id: "5dbc81b4b642e511343c8de8"
    // }
    const date = formatDate(hashObject.date);
    const total = this.state.tax === null ? null : 19.99 + this.state.tax;

    return (
      <React.Fragment>
        <Warning errors={this.state.errors} />
        <div className="pay-hash-form-container">
          <div>
            <p className="hash-order-summary" style={{ fontSize: "22px" }}>
              Order Summary
            </p>
            <div className="order-summary-container">
              <p className="order-summary-item">Date: </p>
              <span className="order-summary-item-value">{date}</span>
              <br />
              <p className="order-summary-item">Message: </p>
              <span className="order-summary-item-value">
                {hashObject.message}
              </span>
              <br />
            </div>
            <hr />
            <div className="order-summary-container">
              <p className="order-summary-item">Subtotal: </p>
              <span className="order-summary-item-value">$19.99</span>
              <br />
              <p className="order-summary-item">Tax: </p>
              <span className="order-summary-item-value">
                {this.state.tax === null
                  ? "Select billing state"
                  : `$${this.state.tax}`}
              </span>
              <br />
            </div>
          </div>
          <hr />
          <form onSubmit={this.submit}>
            <label>
              Card number
              <CardNumberElement {...this.createOptions(this.props.fontSize)} />
            </label>
            <label>
              Expiration date
              <CardExpiryElement {...this.createOptions(this.props.fontSize)} />
            </label>
            <label>
              CVC
              <CardCVCElement {...this.createOptions(this.props.fontSize)} />
            </label>
            <label>
              Billing State
              <br />
              <SelectUSState onChange={this.updateState} />
            </label>
            <br />
            <button className="submit-button">
              {total ? `Charge card $${total}` : "Charge Card"}
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return { hashObject: state.hash.hashObject };
}

export default connect(mapStateToProps)(injectStripe(PayHashForm));
