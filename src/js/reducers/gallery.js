import { combineReducers } from 'redux';

import * as actions from '../actions/gallery';

export function list(state = [], action) {
	switch (action.type) {
		case actions.GALLERY_ADD_ITEMS:
			return  action.payload.photos.Keys ? action.payload.photos.Keys : state;

		default:
			return state;
	}
}

export function counters(state = [], action) {
	switch (action.type) {
		case actions.GALLERY_ADD_ITEMS:
			return  action.payload.counters ? action.payload.counters : state;

		default:
			return state;
	}
}
export function itemsTotalCount(state = 0, action) {
	switch (action.type) {
		case actions.GALLERY_ADD_ITEMS:
			return  action.payload.photos.Paging.count;

		default:
			return state;
	}
}

export function page(state = 1, action) {
	switch (action.type) {
		case actions.GALLERY_SET_PAGE:
			return  action.payload;

		default:
			return state;
	}
}

export function label(state = 'gallery', action) {
	switch (action.type) {
		case actions.GALLERY_SET_LABEL:
			return  action.payload;

		default:
			return state;
	}
}
export function edit(state = false, action) {
	switch (action.type) {
		case actions.GALLERY_EDIT_ON:
			return action.payload;
			
		case actions.GALLERY_EDIT_OFF:
			return false;

		default:
			return state;
	}
}

export const gallery = combineReducers({
	list,
	//counters,
	itemsTotalCount,
	//page,
	//label,
	//edit,
});
