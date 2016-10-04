import { combineReducers } from 'redux';

import * as actions from '../actions/user';


export function profile(state = false, action) {
	switch (action.type) {
		case actions.USER_SET:
			return 	action.payload ? action.payload : state;
		case actions.USER_UNSET:
			return 	false;
		default:
			return state;
	}
}

export function friendsIds(state = [], action) {
	switch (action.type) {
		case actions.USER_FRIENDS_IDS_SET:
			return 	action.payload ? action.payload : state;
		case actions.USER_UNSET:
			return 	[];
		default:
			return state;
	}
}

export function friends(state = [], action) {
	switch (action.type) {
		case actions.USER_FRIENDS_SET:
			return 	action.payload ? action.payload : state;
		case actions.USER_UNSET:
			return 	[];
		default:
			return state;
	}
}

export function relatives(state = [], action) {
	switch (action.type) {
		case actions.USER_RELATIVES_SET:
			return 	action.payload ? action.payload : state;
		case actions.USER_UNSET:
			return 	[];
		default:
			return state;
	}
}

export const user = combineReducers({
	profile,
	friends,
	friendsIds,
	relatives,
});
