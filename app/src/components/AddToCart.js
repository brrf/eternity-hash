import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {addItemToCart} from '../actions/cart'
import DatePicker from "react-datepicker";
import TimezonePicker from 'react-bootstrap-timezone-picker';


import 'react-datepicker/dist/react-datepicker.css';
import '../add-to-cart.css'

class AddToCart extends React.Component {
	constructor(props) {
		super(props);		

		this.state = {
			formData: {
				date: new Date(),
				timeZone: '',
				message: '',
				pieceId: this.props.piece._id
			},
			redirect: false,

		}
		this.changeDate = this.changeDate.bind(this);
		this.changeMessage = this.changeMessage.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.changeTimeZone = this.changeTimeZone.bind(this);
	}

	submitForm = (e) => {

		//Add item to cart in mongoDb
		e.preventDefault();
		fetch('http://localhost:5000/cart', {
			method: 'POST',
			body: JSON.stringify(this.state.formData),
			headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost:5000"},
			mode: 'cors',
			credentials: 'include'
		})
		.then(res => res.json())
		.then(async resObject => {
			if (resObject.error) {
				console.log(resObject.error)
			} else {
				this.props.dispatch(addItemToCart(resObject.item))
				this.setState({
					redirect: true
				})
				
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

	changeTimeZone(timeZone) {
	    this.setState({ 
	    	formData: {
	    		...this.state.formData,
	    		timeZone
	    	}
	    })
	    console.log(timeZone)
	}

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
		const {piece} = this.props;

		return (
			<div className='add-to-cart-container'>
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
				    <label className='cart-input-label'>Time zone:</label>			   
			        <TimezonePicker
			          placeholder   = "Select your timezone"
			          onChange      = {this.changeTimeZone}
			          absolute      = {true}
			          value         = {this.state.timeZone}
			        />
					<label className='cart-input-label'>Please provide a special message:</label>
					<br />
					<textarea className='cart-input' style={{width: '200px', height: '85px'}} value={this.state.formData.message} onChange={this.changeMessage}/>
					<br />
					<input className='submit-button' type='submit' value='Purchase this Piece' />
				</form>
				<hr/>
				<p className='cart-educational-text'>On the day of your event, we will store a copy of your message on the blockchain. This message will be stored for eternity!</p>
				<p className='cart-educational-text'>The Bitcoin blockchain will provide a "hash", which can be used to find this message whenever you like. The hash is unique. Another exact hash will never be produced again.</p>
				<p className='cart-educational-text'>The unique nature of this hash will be infused into your Eternity piece. This will ensure that your Eternity piece will also be one-of-a-kind.</p> 

			</div>
		)
	}
}

export default connect()(AddToCart);
