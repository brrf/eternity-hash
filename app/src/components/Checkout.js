import React from 'react';
import {connect} from 'react-redux'
import Navbar from './Navbar';
import Carousel from './Carousel';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import '../checkout.css'

class Checkout extends React.Component {
	constructor(props) {
		super(props);		

		this.state = {
			formData: {
				date: new Date(),
				message: ''
			}
		}
		this.changeDate = this.changeDate.bind(this);
		this.changeMessage = this.changeMessage.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}

	submitForm = (e) => {
		e.preventDefault();
		fetch('http://localhost:5000/cart', {
			method: 'POST',
			body: JSON.stringify(this.state.formData),
			headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost:5000"},
			mode: 'cors',
			credentials: 'include'
		})
		.then(res => res.json())
		.then(resObject => {
			this.setState({
				...this.state.formData,
				message: 'done'
			})
		})
	}

	changeDate = date => {
		this.setState({
			...this.state.formData,
				date
			})
		console.log(date)
	}

	changeMessage = e => {
		console.log(e.target.value)
		this.setState({
			...this.state.formData,
			message: e.target.value
		})
	}
	render() {
		// const {piece} = this.props
		const piece = {
			title: 'Woman by the lake',
			price: 12000,
			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste deleniti quas aspernatur omnis quis rem voluptatibus vel explicabo ab laudantium quasi deserunt hic ipsa beatae impedit laborum asperiores sequi, alias!'
		}
		return (
			<div className='checkout-container'>
				<div className='price-container'>
					<p className='price-label'>PRICE</p>
					<p className='price'>${piece.price}<span className='currency'>USD</span></p>
				</div>
				<hr />
				<form onSubmit={this.submitForm} className='checkout-form'>
					<label className='checkout-input-label'>Date of Event:</label>
					<br />
				    <DatePicker
				        selected={this.state.date}
				        onChange={this.changeDate}
				    />
					<br />
					<label className='checkout-input-label'>Please provide a special message:</label>
					<br />
					<input className='checkout-input' type='text' value={this.state.message} onChange={this.changeMessage}/>
					<br />
					<input className='submit-button' type='submit' value='Purchase this Piece' />
				</form>
				<hr/>
				<p className='checkout-educational-text'>On the day of your event, we will store a copy of your message on the blockchain. This message will be stored for eternity!</p>
				<p className='checkout-educational-text'>The Bitcoin blockchain will provide a "hash", which can be used to find this message whenever you like. The hash is unique. Another exact hash will never be produced again.</p>
				<p className='checkout-educational-text'>The unique nature of this hash will be infused into your Eternity piece. This will ensure that your Eternity piece will also be one-of-a-kind</p> 

			</div>
		)
	}
}

function mapStateToProps({collection}, {match}) {
	let piece;
	// if (!collection.collection) return {state: null}
	// collection.collection.forEach(currentPiece => {
	// 	if (currentPiece._id === match.params.id) {
	// 		piece = currentPiece;
	// 		return;
	// 	} 
	// })
	return {piece};
}

export default connect(mapStateToProps)(Checkout);
