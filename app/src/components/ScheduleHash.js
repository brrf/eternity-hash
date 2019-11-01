import React from 'react';
import {Redirect} from 'react-router-dom';
import Navbar from './Navbar';
import ScheduleHashForm from './ScheduleHashForm';
import PayHash from './PayHash';

export default class scheduleHash extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			hashId: null
		}
		this.redirect = this.redirect.bind(this);
	}

	redirect = (id) => {
		this.setState({
			hashId: id
		})
	}

	render() {
		if (this.state.hashId) {
			return <Redirect to={{pathname: `/hashes/${this.state.hashId}`}} />
		}
		return (
			<div>
				<Navbar />
				<ScheduleHashForm redirect={this.redirect} />
			</div>
		)	
	}
	
}