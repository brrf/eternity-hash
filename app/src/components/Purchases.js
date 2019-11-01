import React from 'react';
import '../orders.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileUpload} from '@fortawesome/free-solid-svg-icons';

export default class Purchases extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pendingDate: [],
			transactionSubmitted: [],
			transactionConfirmed: [],
			shipped: [],
			transaction: null
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
						pendingDate: resObject.pendingDate,
						transactionSubmitted: resObject.transactionSubmitted, 
						transactionConfirmed: resObject.transactionConfirmed,
						shipped: resObject.shipped
					}, )
				}			
			});
	}

	render() {
		return (
			<React.Fragment>
				<table style={{margin: '50px'}}>
					<tbody>
						<tr>
							<th>Order Status</th>
							<th>Date</th>
							<th>Hash</th>
							<th>Confirmations</th>
							<th>Shipping Label</th>
						</tr>
						{
							this.state.pendingDate.map(item => (
								<tr key={item._id}>
									<td>Pending Date</td>
									<td>{item.item.date}</td>
									<td>N/A</td>
									<td>N/A</td>
									<td>N/A</td>
								</tr>
							))
						}
						{
							this.state.transactionSubmitted.map(item => (
								<tr key={item._id}>
									<td>Transaction Submitted</td>
									<td>{item.item.date}</td>
									<td>{item.hash}</td>
									<td>{item.confirmations}</td>
									<td>N/A</td>
								</tr>
							))
						}
						{
							this.state.transactionConfirmed.map(item => {
								return (
								
								<tr key={item._id}>
									<td>Transaction Confirmed</td>
									<td>{item.item.date}</td>
									<td>{item.hash}</td>
									<td>>{item.confirmations}</td>
									<td><a href={item.shippingLabel.label_url} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFileUpload} size='1x' /></a></td>
								</tr>
							)})
						}
						{
							this.state.shipped.map(item => (
								<tr key={item._id}>
									<td>Shipped</td>
									<td>{item.item.date}</td>
									<td>N/A</td>
									<td>N/A</td>
									<td>N/A</td>
								</tr>
							))
						}
					</tbody>
				</table>
			</React.Fragment>
		)
	}
}

// <ol>
// 					{this.state.pendingTransaction.map( purchase => (
// 						<li className='payment-details-details' key={purchase._id}>{purchase.date}</li>
// 						))
// 					}
// 				</ol>
// 				<ol>
// 					{this.state.pendingConfirmation.map( purchase => (
// 						<li className='payment-details-details' key={purchase._id}>{purchase.date}</li>
// 						))
// 					}
// 				</ol>
// 				<button onClick = {this.testShipping}>Test Shipping</button>
// 				<button onClick={this.testBitcoin}>Test Bitcoin</button>
// 				<button onClick={this.getAddress1}>Get address1 details</button>
// 				<button onClick={this.getAddress2}>Get address2 details</button>
// 				<button onClick={this.getTransactionDetails}>Get transaction</button>
// 				<button onClick={this.facuet}>Get satoshis</button>
// 				{
// 					this.state.transaction
// 						?  <button onClick={this.submitTransaction}>Submit transaction</button>
// 						: null
// 				}