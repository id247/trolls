export function addToArray(array, value){
	return [...array, value];
}

export function deletFromArray(array, index){
	return [
			...array.slice(0, index),
			...array.slice(index + 1)
			];
}
export function updateInArray(array, index, value){
	return [
				...array.slice(0, index),
				value,
				...array.slice(index + 1)
			];
}
