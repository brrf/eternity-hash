import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';

function Navbar (props) {
	let fname = props.fname ? (props.fname.charAt(0).toUpperCase() + props.fname.slice(1)) : null;
	let loginStatus = props.fname ? true : false; 
	let authenticationLink = loginStatus ? {link: '/authentication/logout', title: 'Logout'} : {link: '/authentication/login', title: 'Login'};
	return (
    <div className='navbar-parent'>
		<div className='navbar'>
          <Link to='/' className='navbar-home'>Eternity Hash</Link>
          <div className='navbar-right'>
              <div className='navbar-item'>
              	<div className='dropdown-button'>{fname ? `${fname}'s Account` : 'My Account'}
              	<div className='dropdown-items'>
              		<Link to='/comingsoon' className='dropdown-item'>My Cart</Link>
              		<Link to='/comingsoon' className='dropdown-item'>My Hashes</Link>
              		<Link to={authenticationLink.link} className='dropdown-item'>{authenticationLink.title}</Link>
                  <Link to='/addpiece' className='dropdown-item'>Add Piece</Link>
              	</div>
              	</div>
              </div>
              <Link className='navbar-item' to="/collection"> Browse Collection</Link>
              <FontAwesomeIcon icon={faShoppingCart} size='1x' className='navbar-item cart'/>
                {props.cartItem
                  ? <span className='lbl-cart-count' />
                  : null
                }
          </div>
        </div>
        </div>
	)
}

function mapStateToProps(state) {
  const fname = state.authedUser.authedUser ? state.authedUser.authedUser.fname : null
  return {
    fname,
    cartItem: state.checkout.unregisteredCart
  };
}

export default connect(mapStateToProps)(Navbar)