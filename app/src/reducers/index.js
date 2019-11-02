import {combineReducers} from 'redux';
import authedUser from './authedUser';
import collection from './collection';
import cart from './cart';
import orderDetails from './orderDetails';
import hash from './hash';

export default combineReducers({
			authedUser,
			collection,
			cart,
			orderDetails,
			hash
});