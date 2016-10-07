export const GALLERY_ADD_ITEMS 		= 'GALLERY_ADD_ITEMS';

export function addItems(payload) {
	return{
		type: GALLERY_ADD_ITEMS,
		payload: payload
	}
};

export const GALLERY_EDIT_ON 	= 'GALLERY_EDIT_ON';
export const GALLERY_EDIT_OFF 	= 'GALLERY_EDIT_OFF';

export function editOn(commentId) {
	return {
		type: GALLERY_EDIT_ON,
		payload: commentId
	}
}

export function editOff() {
	return {
		type: GALLERY_EDIT_OFF,
	}
}


export const GALLERY_SET_PAGE 	= 'GALLERY_SET_PAGE';

export function setPage(pageId) {
	return {
		type: GALLERY_SET_PAGE,
		payload: pageId
	}
}

export const GALLERY_SET_LABEL 	= 'GALLERY_SET_LABEL';

export function setLabel(label) {
	return {
		type: GALLERY_SET_LABEL,
		payload: label
	}
}
