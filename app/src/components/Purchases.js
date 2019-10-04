import React from 'react';

export default class Purchases extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			purchases: []
		}
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

	render() {
		return (
			<ol className='cart-container'>
				{this.state.purchases.map( purchase => (
					<li className='payment-details-details' key={purchase._id}>{purchase.date}</li>
					))
				}
			</ol>
		)
	}
}