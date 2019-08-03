import React from 'react'

export default class Collection extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			images: [],
			error: ''
		}
		// this.submitForm = this.submitForm.bind(this);
		this.addImage = this.addImage.bind(this);
		this.uploadImages = this.uploadImages.bind(this);
	}

	addImage = (e) => {
		this.setState({
			images: [...this.state.images, URL.createObjectURL(e.target.files[0])]
		})
	};

	uploadImages = (e) => {
		return;
	}
	// 	let formData = new FormData();
	// 	formData.append('image', e.target.files[0])
	// 	fetch('http://localhost:5000/collection', {
	// 		method: 'POST',
	// 		mode: 'cors',
	// 		body: formData
	// 	})
	// 		.then(res => res.json())
	// 		.then(resObject => {
	// 			if (resObject.error) {
	// 				this.setState({
	// 					images: '',
	// 					error: resObject.error
	// 				})
	// 			} else {
	// 				this.setState({
	// 				images: this.state.images.push(resObject.image)
	// 				})
	// 			}			
	// 		})
	// }

	render() {
		return (
			<div>
				<form onSubmit={this.submitForm}>
					 <input type="file" name="image" onChange={this.addImage}/>
					 <input className='submit-button' type="submit" />
				</form>
				{this.state.images.length === 0 
					? null 
					: this.state.images.map(url => {
						return (<img src={url} alt='piece-sample' style={{width: '300px', height: '300px'}} />)
					})}
				<p>{this.state.error}</p>
				<p>{this.state.images[0]}</p>
			</div>
		)
	}
}