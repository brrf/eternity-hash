import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import addToCart from '../actions/checkout'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import '../add-to-cart.css'

class AddToCart extends React.Component {
	constructor(props) {
		super(props);		

		this.state = {
			formData: {
				date: new Date(),
				message: '',
				tempId: '5d46fcf1ef9ec16cf46c7a87'
			},
			redirect: false,

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
			if (resObject.error) {
				console.log(resObject.error)
			} else {
				this.props.dispatch(addToCart(resObject.item))
				this.setState({
				redirect: true
				})
				console.log('should have been added to db')
			}
		})
	}

	changeDate = date => {
		this.setState({
			formData: {
				...this.state.formData,
				date
			}		
		});
	};

	changeMessage = e => {
		this.setState({
			formData: {
				...this.state.formData,
				message: e.target.value
			}			
		});
	};

	render() {
		if (this.state.redirect) {
			return <Redirect to={{pathname: '/cart'}} />
		}
			
		// const {dispatch} = this.props
		const piece = {
			title: 'Woman by the lake',
			price: 12000,
			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste deleniti quas aspernatur omnis quis rem voluptatibus vel explicabo ab laudantium quasi deserunt hic ipsa beatae impedit laborum asperiores sequi, alias!'
		}
		return (
			<div className='cart-container'>
				<div className='price-container'>
					<p className='price-label'>PRICE</p>
					<p className='price'>${piece.price}<span className='currency'>USD</span></p>
				</div>
				<hr />
				<form onSubmit={this.submitForm} className='cart-form'>
					<label className='cart-input-label'>Date of Event:</label>
					<br />
				    <DatePicker
				        selected={this.state.formData.date}
				        onChange={this.changeDate}
				    />
					<br />
					<label className='cart-input-label'>Please provide a special message:</label>
					<br />
					<input className='cart-input' type='text' value={this.state.formData.message} onChange={this.changeMessage}/>
					<br />
					<input className='submit-button' type='submit' value='Purchase this Piece' />
				</form>
				<hr/>
				<p className='cart-educational-text'>On the day of your event, we will store a copy of your message on the blockchain. This message will be stored for eternity!</p>
				<p className='cart-educational-text'>The Bitcoin blockchain will provide a "hash", which can be used to find this message whenever you like. The hash is unique. Another exact hash will never be produced again.</p>
				<p className='cart-educational-text'>The unique nature of this hash will be infused into your Eternity piece. This will ensure that your Eternity piece will also be one-of-a-kind</p> 

			</div>
		)
	}
}

// function mapStateToProps({collection}, {match}) {
// 	let piece;
// 	if (!collection.collection) return {state: null}
// 	collection.collection.forEach(currentPiece => {
// 		if (currentPiece._id === match.params.id) {
// 			piece = currentPiece;
// 			return;
// 		} 
// 	})
// 	return {piece};
// }

export default connect()(AddToCart);