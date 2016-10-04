import * as actions from '../actions/loading';

export function loading(state = false, action) {
	switch (action.type) {
		case actions.LOADING_SHOW:
			return true;
		case actions.LOADING_HIDE:
			return false;
		default:
			return state
	}
}


