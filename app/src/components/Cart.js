import React from 'react';

export default class Cart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			cart: null
		}
	}

	componentDidMount () {
		fetch('http://localhost:5000/cart', {
			method: 'GET',
			//headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost:5000"},
			mode: 'cors',
			credentials: 'include'
		})
		.then(res => res.json())
		.then(resObject => {
			if (resObject.cart === null) {
				return;
			} else {
				this.setState({
					loading: false,
					cart: resObject.cart
				})
			}
		})
	}

	render() {
		console.log(this.state.cart)
		if (this.state.loading) {
			return <div>Loading</div>
		}
		return (
			<div>Your Cart</div>
		)
	}
}