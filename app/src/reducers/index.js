import {combineReducers} from 'redux';
import authedUser from './authedUser';
import collection from './collection';
import cart from './cart'

export default combineReducers({
			authedUser,
			collection,
			cart
});