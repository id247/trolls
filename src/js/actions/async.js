import API from '../api/api';
import OAuth from '../api/hello';

import { PromoOptions } from 'appSettings';

import { HTMLencode, HTMLdecode } from '../helpers/escape';

//import * as visual from '../helpers/visual.js';

import * as loadingActions 		from '../actions/loading';
import * as errorActions 		from '../actions/error';
import * as userActions 		from '../actions/user';
import * as pageActions 		from '../actions/page';
import * as galleryActions 		from '../actions/gallery';


//error handler

export function catchError(err){
	return dispatch => {
		
		let errorStart = 'Ошибка ' + err.message + ':';
		let errorEnd = 'Попробуйте обновить страницу.';

		//kind of bigfix for ie10 bug with 401 statuses
		if (err.message === 'Network request failed' && !err.description){
			dispatch(logout());
			return;
		}

		if (!err.description) {
			console.error(errorStart + ' ' + err);			
			dispatch(errorActions.setError(errorStart + err + errorEnd));
			return;
		}

		let description = err.description;

		if (err.description.type && err.description.description){

			description = err.description.type + ' (' + err.description.description + ')'; 

		}

		if (err.description.type === 'outOfAuthScope'){
			console.error('outOfAuthScope');
			dispatch(logout());
			dispatch(login());
			return;
		}

		console.error(errorStart + ' ' + description);
		console.error('err.message' + err.message);

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


//friends
//



export function getFriends() {
	return (dispatch, getState) => {

		console.log(getState().user.profile);

		dispatch(loadingActions.loadingShow());	
		
		return API.getUserFriendsIds()
		.then( friendsIds => {

			dispatch(userActions.userFriendsIdsSet(friendsIds));
			return API.getUsers(friendsIds);
		})
		.then( friends => {
			dispatch(loadingActions.loadingHide());
			dispatch(userActions.userFriendsSet(friends));
		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});
	}
}


//stockers


export function sendSticker(stickerId, friendId) {
	return dispatch => {

		if (!stickerId || !friendId){
			return false;
		}

		dispatch(loadingActions.loadingShow());	

		const badge = {
			imageUrl: PromoOptions.cdn + 'images/stickers/' + stickerId + '.png',
			redirectUrl: PromoOptions.url,
			//text: 'Подпись',
		}
		
		return API.postStickerToWall(friendId, badge)
		.then( res => {

			dispatch(loadingActions.loadingHide());
			console.log(res);

			if (res === 'ok'){
				//dispatch(resultsActions.addFriendId(friendId));
				//dispatch(sendResultsToDB());
			}

			return res;
		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});
	}
}


//gallery



export function getPhotos(pageNumber = 1) {


	return (dispatch, getState) => {
		dispatch(loadingActions.loadingShow());	

		const label = PromoOptions.galeryLabel;

		let photos;
		let counters;
		let firstPageCounters;

		const countersPageSize = 100;

		return API.getKeysFromDBdesc(label, pageNumber, PromoOptions.pageSize)
		.then( res => {
			photos = res;
			return API.getCoutersFromDBdesc(label, 1, countersPageSize); //fist request to get counters total count
		})
		.then( res => {			
			firstPageCounters = res.Counters;

			if (res.Paging.count < countersPageSize){
				return []; //return empry array if 1 page is enouth
			}

			const pagesCount = Math.ceil(res.Paging.count / countersPageSize);
			const pageNumbers = Array.from(Array(pagesCount).keys());

			console.log(pageNumbers);

			return getChunkPromises(pageNumbers, 10, (pages) => {
				console.log(pages);
				return pages
				.filter( page => page > 0) //filter out first page
				.map( page => API.getCoutersFromDBdesc(label, page + 1,  countersPageSize) );
			});

		})
		.then( results => {

			counters = results.reduce( (prev, res) => {
				return [...prev, ...res.Counters];
			}, []);

			counters = [...firstPageCounters, ...counters];

			const userIds = photos.Keys.map( key => key.UserId);

			return API.getUsers([...new Set(userIds)]);
		})
		.then( (res) => {			

			const users = res;

			photos.Keys = photos.Keys.map( key => {
				key.counter = false;
				key.user = false;

				counters.map( counter => {
					if (parseInt(counter.Name) === key.Id){
						key.counter = counter;
					}
				});

				users.map( user => {
					if (parseInt(user.id) === key.UserId){
						key.user = user;
					}
				});

				try {
					key.Value = JSON.parse(HTMLdecode(key.Value));					
				}catch(e){
					console.error(e, key.Id);

					key.Value = false;
				}	

				return key;			
				
			});

			dispatch(galleryActions.addItems({photos: photos}));

		})
		.then( () => {			
			dispatch(loadingActions.loadingHide());
		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});
	}
}


export function deleteFromDB(key) {

	return (dispatch, getState) => {

		const roles = getState().user.profile.roles;

		if (roles.indexOf('System') === -1){
			return false;
		}

		if (!confirm('Уверены что хотите удалить эту запись?')){
			return false;
		}

		dispatch(loadingActions.loadingShow());	

		return API.deleteKeyFromDB(key)
		.then( (res) => {	
			console.log(res);
			dispatch(loadingActions.loadingHide());

			if (res.type !== 'systemForbidden'){
				//dispatch(getComments());
			}
		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});
	}
}

export function vote(keyId) {

	return (dispatch, getState) => {
		dispatch(loadingActions.loadingShow());	
		
		const label = PromoOptions.galeryLabel;

		return API.voteForCounterFromDB(keyId, label)
		.then( (res) => {	
			console.log(res);
			dispatch(loadingActions.loadingHide());

			if (res.type !== 'systemForbidden'){
				//dispatch(getComments());
				return 'ok';
			}
		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});
	}
}

//upload


export function uploadPhoto(base64) {

	let fileName = 'fileName';

	switch(true){
		case (base64.indexOf('image/png') > -1):
			base64 = base64.replace(/data:image\/png;base64,/, '');
			fileName += '.png';
			break;
		case (base64.indexOf('image/jpg') > -1):
			base64 = base64.replace(/data:image\/jpg;base64,/, '');
			fileName += '.jpg';
			break;
		case (base64.indexOf('image/jpeg') > -1):
			base64 = base64.replace(/data:image\/jpeg;base64,/, '');
			fileName += '.jpeg';
			break;
		case (base64.indexOf('image/gif') > -1):
			base64 = base64.replace(/data:image\/gif;base64,/, '');
			fileName += '.gif';
			break;
	}	

	const file = {
		fileName: fileName,
		base64: base64,
	};

	return (dispatch, getState) => {

		dispatch(loadingActions.loadingShow());	

		return API.uploadImageToDB(file.base64, file.fileName)
		.then( taskId => {

			console.log(taskId);	

			return new Promise( (resolve, reject) =>{
				
				const interval = setInterval( ()=> {
					
					API.checkUpload(taskId)
					.then( res => {
						console.log(res);

						clearInterval(interval);

						resolve(res);

					})
					.catch( err => {
						console.log(err);
					});

				}, 2000);

			});

		})
		.then( (fileData) => {

			console.log(fileData);

			const data = {
				label: PromoOptions.galeryLabel,
				key: 'gallery-' + new Date().getTime(),
				value: HTMLencode(JSON.stringify(fileData)),
				permissionLevel: 'Public',
			}

			console.log(data);

			return API.addKeyToDB(data);
		})
		.then( res => {
			
			dispatch(loadingActions.loadingHide());

			console.log(res);

			return 'ok';

		})
		.catch( err => {
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 

			return 'err';
		});	
	}
}


// authorisation

export function login() {
	return dispatch => {
		dispatch(loadingActions.loadingShow());
		
		return OAuth.login()
		.then( () => {

			return API.getUser()			
			.then( (user) => {	
				dispatch(userActions.userSet(user));			
			})
			.catch( err => { 
				dispatch(catchError(err)); 
			})
			.then( () => {	
				dispatch(loadingActions.loadingHide());				
			});

		},(err) => {
			dispatch(loadingActions.loadingHide());	
			//dispatch(catchError(err));
		})
	}
}


export function logout() {
	return dispatch => {
		OAuth.logout();
		dispatch(userActions.userUnset());
		//dispatch(pageActions.setPageWithoutHistory('/login'));
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
			
			//dispatch(pageActions.setPageWithoutHistory('/'));
		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			//dispatch(pageActions.setPageWithoutHistory('/login'));
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

