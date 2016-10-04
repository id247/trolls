export const LOADING_SHOW = 'LOADING_SHOW';
export const LOADING_HIDE = 'LOADING_HIDE';

export function loadingShow() {
	return {
		type: LOADING_SHOW
	}
}
export function loadingHide() {
	return {
		type: LOADING_HIDE
	}
}
