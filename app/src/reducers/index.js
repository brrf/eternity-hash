import {combineReducers} from 'redux';
import authedUser from './authedUser';
import collection from './collection';

export default combineReducers({
			authedUser,
			collection
})