import React from 'react'

export default class Collection extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			file: 'https://news.nationalgeographic.com/content/dam/news/2018/05/17/you-can-train-your-cat/02-cat-training-NationalGeographic_1484324.jpg'
		}
		// this.submitForm = this.submitForm.bind(this);
		this.changeFile = this.changeFile.bind(this);
	}

	changeFile = (e) => {

		let formData = new FormData();
		formData.append('image', e.target.files[0])
		fetch('http://localhost:5000/collection', {
			method: 'POST',
			mode: 'cors',
			body: formData
		})
			.then(res => res.json())
			.then(resObject => {
				console.log(resObject)
				this.setState({
					file: resObject.file
				})
			})
	}

	render() {
		return (
			<div>
			<form onSubmit={this.submitForm}>
				 <input type="file" name="image" onChange={this.changeFile}/>
				 <input className='submit-button' type="submit" />
			</form>
			<img src={`/pieces-images/${this.state.file}`} style={{width: '300px', height: '300px'}}/>
			<p>{this.state.file}</p>
			</div>
		)
	}
}