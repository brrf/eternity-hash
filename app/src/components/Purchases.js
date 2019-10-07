import React from 'react';

export default class Purchases extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			purchases: []
		}
		this.testBitcoin = this.testBitcoin.bind(this);
	}

	componentDidMount () {
		fetch('http://localhost:5000/purchases', {
			method: 'GET',
			headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost:5000"},
			mode: 'cors',
			credentials: 'include'
		})
			.then(res => res.json())
			.then(resObject => {
				if (resObject.error) {
					console.log(resObject.error)
				} else {
					this.setState({
						purchases: resObject.purchases
					})
					console.log({purchases: resObject.purchases});
				}			
			});
	}

	testBitcoin = (e) => {
		e.preventDefault();
		console.log('here');
		fetch('http://api.blockcypher.com/v1/btc/main', {
			method: 'GET',
			headers: {"Content-Type": "application/json"},
			mode: 'cors'
		})
			.then(res => res.json())
			.then(resObject => {
				console.log(resObject);
			});
	}



	render() {
		return (
			<React.Fragment>
				<ol>
					{this.state.purchases.map( purchase => (
						<li className='payment-details-details' key={purchase._id}>{purchase.date}</li>
						))
					}
				</ol>
				<button onClick={this.testBitcoin}>Test Bitcoin</button>
			</React.Fragment>
		)
	}
}