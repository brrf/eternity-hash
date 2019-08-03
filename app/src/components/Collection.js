import React from 'react';

export default class Collection extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			collection: []
		}
	}

	componentDidMount() {
		fetch('http://localhost:5000/collection', {
			method: 'GET',
			mode: 'cors'
		})
			.then(res => res.json())
			.then(resObject => {
				this.setState({
					loading: false,
					collection: resObject.collection
				})
			})
	}
	render() {
		return (
			<div>
				{this.state.loading 
					? <p>Loading...</p>
					: this.state.collection.map(piece => {
						return (
							<img 
								style={{height: '400px', width: '400px'}}
								src={require(`../../public/pieces-images/${piece.thumbnails[0]}`)}
								key={piece.thumbnails[0]}
								alt='piece'
							/>
						)
					})
				}
			</div>
		)	
	}
}