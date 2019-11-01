import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart, faUser} from '@fortawesome/free-solid-svg-icons';
import {receiveCart} from '../actions/cart';

class Navbar extends React.Component {
  componentDidMount() {
    fetch('http://localhost:5000/cart', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(resObject => {
        this.props.dispatch(receiveCart(resObject.cart))
    })
  }
  render () {
    let loginStatus = this.props.fname ? true : false; 
    let authenticationLink = loginStatus ? {link: '/authentication/logout', title: 'Logout'} : {link: '/authentication/login', title: 'Login'};

  	return (
      <div className='navbar-parent'>
  		  <div className='navbar'>
          <Link to='/' className='navbar-home'>Eternity Hash</Link>
          <div className='navbar-right'>
            <Link className='navbar-item' to="/hashes">Schedule A Hash</Link>
            <Link className='navbar-item' to="/collection">Browse Collection</Link>
            <Link to='/cart'>
              <FontAwesomeIcon icon={faShoppingCart} size='1x' className='navbar-item cart-svg'/>
            </Link>
              {this.props.cartCount > 0
                ? <span className='lbl-cart-count'>{this.props.cartCount}</span>
                : null
              }
            <FontAwesomeIcon icon={faUser} size='1x' className='navbar-item' />
            <div className='dropdown-items'>
              <Link to='/comingsoon' className='dropdown-item'>My Cart</Link>
              <Link to='/comingsoon' className='dropdown-item'>My Hashes</Link>
              <Link to={authenticationLink.link} className='dropdown-item'>{authenticationLink.title}</Link>
              <Link to='/addpiece' className='dropdown-item'>Add Piece</Link>
              <Link to='/purchases'>See purchases</Link>
            </div>
          </div>            
        </div>
      </div>
  	)
  }
}

function mapStateToProps(state) {
  const fname = state.authedUser.authedUser ? state.authedUser.authedUser.fname : null
  return {
    fname,
    cartCount: state.cart.cart.length
  };
}

export default connect(mapStateToProps)(Navbar)