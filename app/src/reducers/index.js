import {combineReducers} from 'redux';
import authedUser from './authedUser';
import collection from './collection';
import checkout from './checkout'

export default combineReducers({
			authedUser,
			collection,
			checkout
});