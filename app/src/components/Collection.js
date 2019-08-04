import React from 'react';
import Navbar from './Navbar';
import '../collection.css'

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
				<Navbar />
				{this.state.loading 
					? <p>Loading...</p>
					: <div className='collection-container'>
						{this.state.collection.map(piece => {
						return (
							<div key={piece.thumbnails[0]} className='piece'>				
								<img 
									className='piece-image'
									src={require(`../../public/pieces-images/${piece.thumbnails[0]}`)}
									alt='piece'
								/>
							</div>
						)
						})}						
					  </div>	
				}
			</div>
		)
	}	
}

