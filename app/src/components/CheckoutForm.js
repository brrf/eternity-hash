import React from 'react';
import {CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe} from 'react-stripe-elements';
import getShippingRates from '../utils/getShippingRates';
import {setShippingRates} from '../actions/orderDetails';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      stripeToken: null,
      card: null
    } 

    this.submit = this.submit.bind(this);
  };

  createOptions = (fontSize, padding) => {
    return {
      style: {
        base: {
          fontSize,
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, monospace',
          '::placeholder': {
            color: '#aab7c4',
          },
          padding,
        },
        invalid: {
          color: '#9e2146',
        },
      },
    };
  };

  async submit(ev) {
    ev.preventDefault();
    let rates = await getShippingRates(this.props.address, this.props.cart.cart[0]);
    this.props.dispatch(setShippingRates(rates))

    let {token} = await this.props.stripe.createToken({name: "Name"});
    if (!token) {
      console.log('error with card');
      return;
    }
    this.setState({
      redirect: true,
      stripeToken: token.id,
      card: token.card,
    });
  };

  render() {
    if (this.state.redirect && this.state.stripeToken && this.state.card) {
        return <Redirect to={{
          pathname: '/cart/final', 
          state: {
            stripeToken: this.state.stripeToken, 
            card: this.state.card,
            purchasedItemId: this.props.purchasedItemId
          }
        }}/>
    }
    return (
      <form onSubmit={this.submit}>
        <label>
          Card number
          <CardNumberElement
            {...this.createOptions(this.props.fontSize)}
          />
        </label>
        <label>
          Expiration date
          <CardExpiryElement
            {...this.createOptions(this.props.fontSize)}
          />
        </label>
        <label>
          CVC
          <CardCVCElement
            {...this.createOptions(this.props.fontSize)}
          />
        </label>
        <button className='submit-button'>Review Final Order</button>
      </form>
    )
  }
};

function mapStateToProps(state) {
  return {cart: state.cart, rates: state.orderDetails.shippingRates, address: state.orderDetails.shippingInformation};
}

export default connect(mapStateToProps)(injectStripe(CheckoutForm));
