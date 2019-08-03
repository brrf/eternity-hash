import React from 'react'

export default class Collection extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: {
				images: [],
				title: '',
				description: '',
				price: ''
			},		
			error: '',
			blobs: []
		}
		this.addImage = this.addImage.bind(this);
		this.uploadImages = this.uploadImages.bind(this);
		this.updateTitle = this.updateTitle.bind(this);
		this.updateDescription = this.updateDescription.bind(this);
		this.updatePrice = this.updatePrice.bind(this);
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
		fetch('http://localhost:5000/collection', {
		method: 'POST',
		mode: 'cors',
		body: formData
		})
		.then(res => res.json())
		.then(resObject => {
			if (resObject.error) {
				this.setState({
					images: {
						blobs: [],
						urls: []
					},
					error: resObject.error
				})
			} else {
				this.setState({
					images: {
						...this.state.images,
						urls: resObject.filenames
					}
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
				<p>{this.state.error}</p>
			</div>
		)
	}
}