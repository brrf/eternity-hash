import React from 'react'

export default class Collection extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			file: ''
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
				if (resObject.error) {
					this.setState({
						file: '',
						error: resObject.error
					})
				} else {
					this.setState({
					file: resObject.file
					})
				}			
			})
	}

	render() {
		return (
			<div>
				<form onSubmit={this.submitForm}>
					 <input type="file" name="image" onChange={this.changeFile}/>
					 <input className='submit-button' type="submit" />
				</form>
				{this.state.file === '' ? null : <img src={`/pieces-images/${this.state.file}`} style={{width: '300px', height: '300px'}} />}
				<p>{this.state.error}</p>
			</div>
		)
	}
}