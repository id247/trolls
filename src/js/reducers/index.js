import { combineReducers } from 'redux';

import { error } from './error';
import { user } from './user';
import { loading } from './loading';
import { page } from './page';

const rootReducer = combineReducers({
	error,
	loading,
	user,
	page,
});

export default rootReducer;
