export const ERROR_SET = 'ERROR_SET';

export function setError(error) {
	return {
		type: ERROR_SET,
		payload: error,
	}
}


