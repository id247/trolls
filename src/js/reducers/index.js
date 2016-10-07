import { combineReducers } from 'redux';

import { error } from './error';
import { user } from './user';
import { loading } from './loading';
import { page } from './page';
import { gallery } from './gallery';

const rootReducer = combineReducers({
	error,
	loading,
	user,
	page,
	gallery,
});

export default rootReducer;
