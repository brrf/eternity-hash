import React from 'react';

export default class Other extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loggedIn: false
		}
	}

	componentDidMount() {
		fetch('http://localhost:5000/comingsoon', {
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

	render() {
		let style = {display: 'flex', justifyContent: 'center', fontWeight: 'bold'};
		if (this.state.loggedIn) {
			return <p style={style}>Under Development</p>
		} else {
			return <p style={style}>You are not Logged in</p>
		}
	}
}
