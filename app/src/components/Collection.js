import React from 'react';

export default class Collection extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true
		}
	}

	componentDidMount() {
		fetch('localhost:5000/collection', {
			method: 'GET',
			mode: 'cors'
		})
			.then(res => res.json())
			.then(resObject => {
				this.setState({
					loading: false
				})
			})
	}

	render() {
		return (
			<div>
				{this.state.loading 
					? <p>Loading...</p>
					: <p>Coming Soon</p>
				}
			</div>
		)	
	}
	
}