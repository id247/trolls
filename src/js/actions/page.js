import { hashHistory } from 'react-router';

export const PAGE_SET = 'PAGE_SET';
export const PAGE_SET_HISTORY = 'PAGE_SET_HISTORY';

export function setPage(page) {

	hashHistory.push(page);

	return {
		type: PAGE_SET,
		payload: page,
	}
}

export function setPageWithoutHistory(page) {

	hashHistory.replace(page);

	return {
		type: PAGE_SET,
		payload: page,
	}
}


