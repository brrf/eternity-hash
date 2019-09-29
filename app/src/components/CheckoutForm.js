import React from 'react';
import {CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement, injectStripe} from 'react-stripe-elements';
import {Redirect} from 'react-router-dom';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    }

    this.submit = this.submit.bind(this);
  };

  handleBlur = () => {
    console.log('[blur]');
  };
  handleChange = (change) => {
    console.log('[change]', change);
  };
  handleClick = () => {
    console.log('[click]');
  };
  handleFocus = () => {
    console.log('[focus]');
  };
  handleReady = () => {
    console.log('[ready]');
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
    let {token} = await this.props.stripe.createToken({name: "Name"});
    if (!token) {
      console.log('error with card');
      return;
    }

    await fetch("http://localhost:5000/charge", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id: token.id}),
      mode: 'cors',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(resObject => {
        resObject.error
          ? console.log(resObject.error)
          : this.setState({
            redirect: resObject.redirect
          })
     });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <form onSubmit={this.submit}>
        <label>
          Card number
          <CardNumberElement
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onReady={this.handleReady}
            {...this.createOptions(this.props.fontSize)}
          />
        </label>
        <label>
          Expiration date
          <CardExpiryElement
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onReady={this.handleReady}
            {...this.createOptions(this.props.fontSize)}
          />
        </label>
        <label>
          CVC
          <CardCVCElement
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onReady={this.handleReady}
            {...this.createOptions(this.props.fontSize)}
          />
        </label>
        <button className='submit-button'>Continue</button>
      </form>
    )
  }
};

export default injectStripe(CheckoutForm);
