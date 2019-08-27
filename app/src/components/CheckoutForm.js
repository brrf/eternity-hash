import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

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
        if(resObject.error) {
          console.log('error charging card');
        } else console.log('success!')
     });
  }


  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);