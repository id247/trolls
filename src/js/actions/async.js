import API from '../api/api';
import OAuth from '../api/hello';

import { ForumOptions } from 'appSettings';

import * as visual from '../helpers/visual.js';

import * as loadingActions 		from '../actions/loading';
import * as errorActions 		from '../actions/error';
import * as userActions 		from '../actions/user';
import * as pageActions 		from '../actions/page';


//error handler

export function catchError(err){
	return dispatch => {
		
		let errorStart = 'Ошибка ' + err.message + ':';
		let errorEnd = 'Попробуйте обновить страницу.';

		if (!err.description) {
			console.error(errorStart + ' ' + err);			
			dispatch(errorActions.setError(errorStart + err + errorEnd));
			return;
		}

		let description = err.description;

		if (err.description.type && err.description.description){

			description = err.description.type + ' (' + err.description.description + ')'; 

		}

		console.error(errorStart + ' ' + description);

		switch (err.message){
			case 401:					
				dispatch(logout());
				return;
				
				break;
			case 403: 
				errorEnd = 'Отказано в доступе.'
				
				break;
			case 404: 
				errorEnd = 'Запрошеный ресурс не найден.'
				
				break;
		}

		dispatch(errorActions.setError(errorStart + ' ' + description + ' ' + errorEnd));
	
	}
}

// authorisation

export function login() {
	return dispatch => {
		dispatch(loadingActions.loadingShow());
		
		return OAuth.login()
		.then( () => {
			dispatch(loadingActions.loadingHide());	

			dispatch(pageActions.setPageWithoutHistory('/'));
		},(err) => {
			dispatch(loadingActions.loadingHide());	

			//dispatch(catchError(err));
		});
	}
}


export function logout() {
	return dispatch => {
		OAuth.logout();
		dispatch(userActions.userUnset());
		dispatch(pageActions.setPageWithoutHistory('/login'));
	}
}


//init

export function getInitialData() {

	return dispatch => {
		dispatch(loadingActions.loadingShow());	

		return API.getUser()
		.then( (user) => {	
			dispatch(loadingActions.loadingHide());

			dispatch(userActions.userSet(user));
			dispatch(pageActions.setPageWithoutHistory('/'));
		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(pageActions.setPageWithoutHistory('/login'));
			dispatch(catchError(err)); 
		})
		.then( () => {			
			
		})
	}
}


export function init() {
	return dispatch => {
		return dispatch(getInitialData());	
	}
}

