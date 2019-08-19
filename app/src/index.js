import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers/';

// function getUserCart () {
// 	fetch('http://localhost:5000/cart', {
// 			method: 'GET',
// 			mode: 'cors',
// 			credentials: 'include'
// 		})
// 		.then(res => res.json())
// 		.then(resObject => {
// 			if (resObject.cart === null) {
// 				return {cart: []};
// 			} else {
// 				console.log('here')
// 				return {cart: resObject.cart}
// 			}
// 		})
// }

// console.log(cart);

const store = createStore(reducer);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('root'));
