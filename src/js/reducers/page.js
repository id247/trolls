import * as actions from '../actions/page';

export function page(state = false, action) {
	switch (action.type) {
		case actions.PAGE_SET:
			return action.payload;
		default:
			return state
	}
}


