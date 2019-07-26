import React from 'react';

export default function Navbar () {
	return (
		<div className='navbar'>
          <h1>Eternity Hash</h1>
          <div className='navbar-right'>
              <a className='navbar-link' href="./authentication/login">My Account</a>
              <a className='navbar-link' href="./authentication/login"> Browse Collection</a>
          </div>
        </div>
	)
}