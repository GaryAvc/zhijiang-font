import * as ActionTypes from './ActionTypes';
import { useAlert } from 'react-alert';

import md5 from 'md5';
import {
	baseUrl,
	preTestUrl,
	finalTestUrl,
	rankUrl,
	downloadUrl,
} from '../shared/baseUrl';

// const alert = useAlert();

export const requestLogin = (creds) => {
	return {
		type: ActionTypes.LOGIN_REQUEST,
		creds,
	};
};

export const receiveLogin = (response) => {
	return {
		type: ActionTypes.LOGIN_SUCCESS,
		token: response.token,
	};
};

export const loginError = (message) => {
	return {
		type: ActionTypes.LOGIN_FAILURE,
		message,
	};
};

// todo: use md5 to change the username and password to encrypted token
//
export const loginUser = (creds) => (dispatch) => {
	// We dispatch requestLogin to kickoff the call to the API
	dispatch(requestLogin(creds));

	/*
	Req：userName, timestamp, md5(userName+md5(password)+timestamp)
	*/

	const username = creds.username;
	const password = creds.password;
	const timestamp = new Date().getTime();
	const encryptedPassword = md5(password);
	const encryptedNamePasswordTimestamp = md5(
		username + encryptedPassword + timestamp
	);
	const userInfo =
		'login?username=' +
		username +
		'&timestamp=' +
		timestamp +
		'&token=' +
		encryptedNamePasswordTimestamp;

	return fetch(baseUrl + userInfo, {
		method: 'GET',
	})
		.then(
			(response) => {
				if (!response.result) {
					return response;
				} else {
					var error = new Error(
						'Error ' + response.status + ': ' + response.statusText
					);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				throw error;
			}
		)
		.then((response) => response.json())
		.then((response) => {
			if (response.data) {
				// If login was successful, set the token in local storage
				console.log(
					'here is the username when it is recorded:' + creds.username
				);
				localStorage.setItem('token', response.data);
				localStorage.setItem('creds', JSON.stringify(creds));
				localStorage.setItem('username', creds.username);
				// Dispatch the success action
				dispatch(receiveLogin(response));
			} else {
				var error = new Error('Error ' + response.status);
				error.response = response;
				alert(response.msg);
				console.log('here is the error' + response.msg);
				throw error;
			}
		})
		.catch((error) => {
			dispatch(loginError(error.message));
			// alert.show(error.message);
		});
};

export const requestLogout = () => {
	return {
		type: ActionTypes.LOGOUT_REQUEST,
	};
};

export const receiveLogout = () => {
	return {
		type: ActionTypes.LOGOUT_SUCCESS,
	};
};

// Logs the user out
export const logoutUser = () => (dispatch) => {
	dispatch(requestLogout());
	localStorage.removeItem('token');
	localStorage.removeItem('creds');

	dispatch(receiveLogout());
};

/*
---------- end of LOGIN / LOGOUT part --------------
*/

export const fetchDishes = () => (dispatch) => {
	dispatch(dishesLoading(true));

	return fetch(baseUrl + preTestUrl)
		.then((response) => response.json())
		.then((dishes) => dispatch(addDishes(dishes.data)))
		.catch((error) => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
	type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errmess) => ({
	type: ActionTypes.DISHES_FAILED,
	payload: errmess,
});

export const addDishes = (dishes) => ({
	type: ActionTypes.ADD_DISHES,
	payload: dishes,
});

// ---- end of dish(problem/题目) part ----

// ---- start of finalTests part ----

export const fetchFinalTests = () => (dispatch) => {
	dispatch(finalTestsLoading(true));

	return fetch(baseUrl + finalTestUrl)
		.then((response) => response.json())
		.then((finalTests) => dispatch(addFinalTests(finalTests.data)))
		.catch((error) => dispatch(finalTestsFailed(error.message)));
};

export const finalTestsLoading = () => ({
	type: ActionTypes.FINALTESTS_LOADING,
});

export const finalTestsFailed = (errmess) => ({
	type: ActionTypes.FINALTESTS_FAILED,
	payload: errmess,
});

export const addFinalTests = (finalTests) => ({
	type: ActionTypes.ADD_FINALTESTS,
	payload: finalTests,
});

// ---- end of finalTests part ----

// ---- start of records part ----
export const fetchRecords = (questionId) => (dispatch) => {
	dispatch(recordsLoading(true));

	return fetch(
		baseUrl +
			'listCommitRecords?caseId=' +
			questionId +
			'&username=' +
			localStorage.getItem('username')
	)
		.then((response) => response.json())
		.then((records) => dispatch(addRecords(records.data)))
		.catch((error) => dispatch(recordsFailed(error.message)));
};

export const recordsLoading = () => ({
	type: ActionTypes.RECORDS_LOADING,
});

export const recordsFailed = (errmess) => ({
	type: ActionTypes.RECORDS_FAILED,
	payload: errmess,
});

export const addRecords = (records) => ({
	type: ActionTypes.ADD_RECORDS,
	payload: records,
});

// ---- end of records part ----

// ---- start of rank part ----

export const fetchRanks = () => (dispatch) => {
	dispatch(ranksLoading(true));

	return fetch(baseUrl + rankUrl)
		.then((response) => response.json())
		.then((ranks) => dispatch(addRanks(ranks)))
		.catch((error) => dispatch(ranksFailed(error.message)));
};

export const addRanks = (ranks) => ({
	type: ActionTypes.ADD_RANKS,
	payload: ranks,
});

export const ranksFailed = (errmess) => ({
	type: ActionTypes.RANKS_FAILED,
	payload: errmess,
});

export const ranksLoading = () => ({
	type: ActionTypes.RANKS_LOADING,
});

// ---- end of rank part ----

// ---- start of download part ----

export const fetchDownloads = () => (dispatch) => {
	dispatch(downloadsLoading(true));

	return fetch(baseUrl + downloadUrl)
		.then((response) => response.json())
		.then((downloads) => dispatch(addDownloads(downloads.data)))
		.catch((error) => dispatch(downloadsFailed(error.message)));
};

export const addDownloads = (downloads) => ({
	type: ActionTypes.ADD_DOWNLOADS,
	payload: downloads,
});

export const downloadsFailed = (errmess) => ({
	type: ActionTypes.DOWNLOADS_FAILED,
	payload: errmess,
});

export const downloadsLoading = () => ({
	type: ActionTypes.DOWNLOADS_LOADING,
});

// ---- end of download part ----
/*
------------------- end of zj useful part -------------------
*/
