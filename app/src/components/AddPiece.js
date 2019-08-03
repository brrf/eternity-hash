import React from 'react';
import {Redirect} from 'react-router-dom';

export default class AddPiece extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: {
				images: [],
				title: '',
				description: '',
				price: ''
			},		
			res: 'nothing yet',
			blobs: [],
			redirect: false,
			loggedIn: false
		}
		this.addImage = this.addImage.bind(this);
		this.uploadImages = this.uploadImages.bind(this);
		this.updateTitle = this.updateTitle.bind(this);
		this.updateDescription = this.updateDescription.bind(this);
		this.updatePrice = this.updatePrice.bind(this);
	}

	componentDidMount() {
		fetch('http://localhost:5000/authenticate', {
			method: 'GET',
			mode: 'cors',
			credentials: 'include'
		})
			.then(res => res.json())
			.then(resObject => {
				if(resObject.loggedIn) {
					this.setState({
						loggedIn: true
					})
				}
			});			
	}

	addImage = (e) => {
		if (this.state.formData.images.length > 4) return;
		this.setState({
			formData: {
				...this.state.formData,
				images: [...this.state.formData.images, e.target.files[0]]
			},
			blobs: [...this.state.blobs, URL.createObjectURL(e.target.files[0])]
		})		
	};

	uploadImages = (e) => {
		e.preventDefault();
		let formData = new FormData();
		for (let i = 0; i < this.state.formData.images.length; i++) {
			formData.append('images', this.state.formData.images[i])
		}
		formData.append('title', this.state.formData.title);
		formData.append('description', this.state.formData.description);
		formData.append('price', this.state.formData.price)
		fetch('http://localhost:5000/addpiece', {
		method: 'POST',
		mode: 'cors',
		body: formData,
		credentials: 'include'
		})
		.then(res => res.json())
		.then(resObject => {
			if (resObject.error) {
				this.setState({
					images: {
						blobs: [],
						urls: []
					},
					res: resObject.res
				})
			} else {
				this.setState({
					res: resObject.res
				})
			}			
		})
	}

	updateTitle = (e) => {
		this.setState({
			formData: {
				...this.state.formData,
				title: e.target.value	
			}
				
		})
	};

	updateDescription = (e) => {
		this.setState({
			formData: {
				...this.state.formData,
				description: e.target.value
			}
				
		})
	};

	updatePrice = (e) => {
		this.setState({
			formData: {
				...this.state.formData,
				price: e.target.value
			}
					
		})
	};

	render() {
		if (this.state.redirect) {
       		return <Redirect to='/Collection'/>;
     	}
     	if (this.state.loggedIn) {
			return (
				<div>
					<form onSubmit={this.uploadImages}>
						<input type="file" name="images" onChange={this.addImage}/>
						<div className='input-section'>				 	
							<label className='input-label'>Title: </label>
							<br></br>
							<input type="text" name="title" value={this.state.formData.title} onChange={this.updateTitle}/>
							<br></br>
						</div>
						<div className='input-section'>
							<label className='input-label'>Description:</label>
							<br></br>
							<input type="textarea" name="description" value={this.state.formData.description} onChange={this.updateDescription}/>
							<br></br>
						</div>
						<div className='input-section'>
							<label className='input-label'>Price:</label>
							<br></br>
							<input type="number" name="price" value={this.state.formData.price} onChange={this.updatePrice}/>
							<br></br>
						</div>
						 <input className='submit-button' type="submit" />
					</form>
					{this.state.blobs.length === 0 
						? null 
						: this.state.blobs.map(blob => {
							return (<img src={blob} key={blob} alt='piece-sample' style={{width: '300px', height: '300px'}} />)
							})
					}
					<p>{this.state.res}</p>
				</div>
			)
		} else return <p>Login as admin</p>
	}
}

// function mapStateToProps(state) {
// 	const {email} = state;
// 	return {email};
// }

// export default connect(mapStateToProps)(AddPiece)

