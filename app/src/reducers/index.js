import {combineReducers} from 'redux';
import authedUser from './authedUser';
import collection from './collection';
import cart from './cart';
import orderDetails from './orderDetails';

export default combineReducers({
			authedUser,
			collection,
			cart,
			orderDetails
});