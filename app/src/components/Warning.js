import React from 'react';

export default class Warning extends React.Component {
	render() {
		return (
			<ul className='error-list'>
		       {this.props.errors.map( error => {
			       	return (
			       		<li className='error-item' key={error}>{error}</li>
			       	)
			       })
		   		}
	      	</ul>
		)
	}
}