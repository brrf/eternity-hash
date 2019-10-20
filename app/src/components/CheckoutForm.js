import React from 'react';
import {CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe} from 'react-stripe-elements';
import {Redirect} from 'react-router-dom';

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

export default injectStripe(CheckoutForm);
