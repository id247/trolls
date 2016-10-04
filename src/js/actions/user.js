
export const USER_SET = 'USER_SET';
export const USER_UNSET = 'USER_UNSET';

export function userSet(user) {
	return {
		type: USER_SET,
		payload: user
	}
};

export function userUnset() {
	return {
		type: USER_UNSET
	}
};


export const USER_FRIENDS_IDS_SET = 'USER_FRIENDS_IDS_SET';

export function userFriendsIdsSet(friendsIds) {
	return {
		type: USER_FRIENDS_IDS_SET,
		payload: friendsIds
	}
};


export const USER_FRIENDS_SET = 'USER_FRIENDS_SET';

export function userFriendsSet(friends) {
	return {
		type: USER_FRIENDS_SET,
		payload: friends
	}
};


export const USER_RELATIVES_SET = 'USER_RELATIVES_SET';

export function userRelativesSet(relatives) {
	return {
		type: USER_RELATIVES_SET,
		payload: relatives
	}
};
