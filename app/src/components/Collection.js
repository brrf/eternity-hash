import React from 'react';
import Navbar from './Navbar'

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
		const style = {
			collectionContainer: {
				marginLeft: '25%',
				display: 'flex',
				flexWrap: 'wrap'
			},
			piece: {
				width: '45%',
			}
		}
		return (
			<div>
				<Navbar />
				{this.state.loading 
					? <p>Loading...</p>
					: <div style={style.collectionContainer}>
						{this.state.collection.map(piece => {
						return (
							<div key={piece.thumbnails[0]} style={style.piece}>				
								<img 
									style={{height: '90%', width: '90%'}}
									src={require(`../../public/pieces-images/${piece.thumbnails[0]}`)}
									alt='piece'
								/>
								<p>{piece.title} -- Price: ${piece.price}</p>
							</div>
						)
						})}						
					  </div>	
				}
			</div>
		)
	}	
}

