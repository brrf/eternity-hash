import React from 'react';

export default class Purchases extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			purchases: []
		}
		this.testBitcoin = this.testBitcoin.bind(this);
		this.getAddress1= this.getAddress1.bind(this);
		this.getAddress2= this.getAddress2.bind(this);
		this.getTransactionDetails = this.getTransactionDetails.bind(this);
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

	//{
	// 	private: "30f24dfb3ae13f2dcbc7f3c1054aee5617f41f6136cf4c5978b6e2a7022845c1", 
	// 	public: "03cbf0f79207d20611fa7d463897c83fdb28f2d2c4e12482d7513e6c27f4a228ec", 
	// 	address: "CCKn36iNpCBcHeqmb9CY38hqzwG1kuQadj", 
	// 	wif: "BpyBBbWkMHgLUo8z6p3XZpDj4ryVn96gTvieDz5QnQLxjCg1EBUY"
	// }

	// {
	// 	private: "17f75660d2a81cdc902830cdeae6688f2d7487d51317d137b1a4462ec778308b", 
	// 	public: "03cce746eede180e84fafc7d0882b8302508beeaaa4659331f0bb1be4b8fb69067", 
	// 	address: "BvzvHJFXyq6X7fwDhvjeSqcLqZj2c2yJ6A", 
	// 	wif: "Bp8cnjyLQN2Pxrh3XSzJH4znSorEKTezmZwmrzQUVgM7iSNqkUFa"
	// }

	testBitcoin = (e) => {
		e.preventDefault();
		var data = {"address": "CCKn36iNpCBcHeqmb9CY38hqzwG1kuQadj", "amount": 100000}
		const token = 'a38ba880bab24358b4273b07344a9e3f';
		var newtx = {
		  inputs: [{addresses: ['CCKn36iNpCBcHeqmb9CY38hqzwG1kuQadj']}],
		  outputs: [{addresses: ['BvzvHJFXyq6X7fwDhvjeSqcLqZj2c2yJ6A'], value: 10}]
		};

		fetch("https://api.blockcypher.com/v1/bcy/test/txs/new", {
			method: "POST",
			body: JSON.stringify(newtx),
			headers: {"Content-Type": "application/json"}
		})
			.then(res => res.json())
			.then(resObject => {
				console.log(resObject);
			});
	}

	getAddress1 = (e) => {
		e.preventDefault();
		let txSkeleton;

		fetch("https://api.blockcypher.com/v1/bcy/test/addrs/CCKn36iNpCBcHeqmb9CY38hqzwG1kuQadj", {
			method: "GET",
			headers: {"Content-Type": "application/json"}
		})
			.then(res => res.json())
			.then(resObject => {
				txSkeleton = resObject;
			});
	}

	getAddress2 = (e) => {
		e.preventDefault();

		fetch("https://api.blockcypher.com/v1/bcy/test/addrs/BvzvHJFXyq6X7fwDhvjeSqcLqZj2c2yJ6A", {
			method: "GET",
			headers: {"Content-Type": "application/json"}
		})
			.then(res => res.json())
			.then(resObject => {
				console.log(resObject);
			});
	}

	getTransactionDetails = (e) => {
		e.preventDefault();

		fetch("https://api.blockcypher.com/v1/bcy/test/txs/$hash", {
			method: "GET",
			headers: {"Content-Type": "application/json"}
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
				<button onClick={this.getAddress1}>Get address1 details</button>
				<button onClick={this.getAddress2}>Get address2 details</button>
				<button onClick={this.getTransactionDetails}>Get transaction</button>
			</React.Fragment>
		)
	}
}