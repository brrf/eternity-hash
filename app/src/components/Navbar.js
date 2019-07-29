import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

function Navbar (props) {
	let fname = props.fname ? (props.fname.charAt(0).toUpperCase() + props.fname.slice(1)) : null;
	return (
		<div className='navbar'>
          <h1>Eternity Hash</h1>
          <div className='navbar-right'>
              <Link className='navbar-link' to="./authentication/login">{fname ? `${fname}'s Account` : 'My Account'}</Link>
              <Link className='navbar-link' to="./authentication/login"> Browse Collection</Link>
          </div>
        </div>
	)
}

export default connect()(Navbar)