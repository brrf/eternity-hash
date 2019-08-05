import React from 'react';
import Navbar from './Navbar';
import {connect} from 'react-redux';
import receiveCollection from '../actions/collection'
import '../collection.css';

class Collection extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
		}
	}

	componentDidMount() {
		fetch('http://localhost:5000/collection', {
			method: 'GET',
			mode: 'cors'
		})
			.then(res => res.json())
			.then(resObject => {
				this.props.dispatch(receiveCollection(resObject.collection))
				this.setState({
					loading: false,
				})

			})
	}

	render() {
		// console.log(Array.isArray(this.props.collection))
		return (
			<div>
				<Navbar />
				{this.state.loading 
					? <p>Loading...</p>
					: <div className='collection-container'>
						{this.props.collection.map(piece => {
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

function mapStateToProps(state) {
	// console.log({thestate: state.collection.collection})
	return {
		collection: state.collection.collection
	}
}


export default connect(mapStateToProps)(Collection);


