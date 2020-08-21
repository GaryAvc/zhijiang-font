import * as ActionTypes from './ActionTypes';
import { auth, firestore, fireauth, firebasestore } from '../firebase/firebase';

import md5 from 'md5';
import { baseUrl } from '../shared/baseUrl';

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
				if (response.ok) {
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
				localStorage.setItem('token', response.data);
				localStorage.setItem('creds', JSON.stringify(creds));
				// Dispatch the success action
				dispatch(receiveLogin(response));
			} else {
				var error = new Error('Error ' + response.status);
				error.response = response;
				throw error;
			}
		})
		.catch((error) => dispatch(loginError(error.message)));
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
	dispatch(favoritesFailed('Error 401: Unauthorized'));
	dispatch(receiveLogout());
};

/*
---------- end of LOGIN / LOGOUT part --------------
*/

export const fetchDishes = () => (dispatch) => {
	dispatch(dishesLoading(true));

	//http://10.0.104.86:8081/listCases?phaseType=1

	return fetch(baseUrl + 'listCases?phaseType=0')
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

export const fetchRecords = () => (dispatch) => {
	dispatch(dishesLoading(true));

	return firestore
		.collection('records')
		.get()
		.then((snapshot) => {
			let records = [];
			snapshot.forEach((doc) => {
				const data = doc.data();
				const _id = doc.id;
				records.push({ _id, ...data });
			});
			return records;
		})
		.then((records) => dispatch(addRecords(records)))
		.catch((error) => dispatch(dishesFailed(error.message)));
};

export const fetchRanks = () => (dispatch) => {
	return firestore
		.collection('ranks')
		.get()
		.then((snapshot) => {
			let ranks = [];
			snapshot.forEach((doc) => {
				const data = doc.data();
				const _id = doc.id;
				ranks.push({ _id, ...data });
			});
			return ranks;
		})
		.then((ranks) => dispatch(addRanks(ranks)))
		.catch((error) => dispatch(dishesFailed(error.message)));
};

export const addRecords = (records) => ({
	type: ActionTypes.ADD_RECORDS,
	payload: records,
});

export const addRanks = (ranks) => ({
	type: ActionTypes.ADD_RANKS,
	payload: ranks,
});

/*
------------------- end of zj useful part -------------------
*/

export const addComment = (comment) => ({
	type: ActionTypes.ADD_COMMENT,
	payload: comment,
});

export const postComment = (dishId, rating, comment) => (dispatch) => {
	if (!auth.currentUser) {
		console.log('No user logged in!');
		return;
	}

	return firestore
		.collection('comments')
		.add({
			author: {
				_id: auth.currentUser.uid,
				firstname: auth.currentUser.displayName
					? auth.currentUser.displayName
					: auth.currentUser.email,
			},
			dish: dishId,
			rating: rating,
			comment: comment,
			createdAt: firebasestore.FieldValue.serverTimestamp(),
			updatedAt: firebasestore.FieldValue.serverTimestamp(),
		})
		.then((docRef) => {
			firestore
				.collection('comments')
				.doc(docRef.id)
				.get()
				.then((doc) => {
					if (doc.exists) {
						const data = doc.data();
						const _id = doc.id;
						let comment = { _id, ...data };
						dispatch(addComment(comment));
					} else {
						// doc.data() will be undefined in this case
						console.log('No such document!');
					}
				});
		})
		.catch((error) => {
			console.log('Post comments ', error.message);
			alert('Your comment could not be posted\nError: ' + error.message);
		});
};

export const fetchComments = () => (dispatch) => {
	return firestore
		.collection('comments')
		.get()
		.then((snapshot) => {
			let comments = [];
			snapshot.forEach((doc) => {
				const data = doc.data();
				const _id = doc.id;
				comments.push({ _id, ...data });
			});
			return comments;
		})
		.then((comments) => dispatch(addComments(comments)))
		.catch((error) => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
	type: ActionTypes.COMMENTS_FAILED,
	payload: errmess,
});

export const addComments = (comments) => ({
	type: ActionTypes.ADD_COMMENTS,
	payload: comments,
});

export const fetchPromos = () => (dispatch) => {
	dispatch(promosLoading(true));

	return firestore
		.collection('promotions')
		.get()
		.then((snapshot) => {
			let promos = [];
			snapshot.forEach((doc) => {
				const data = doc.data();
				const _id = doc.id;
				promos.push({ _id, ...data });
			});
			return promos;
		})
		.then((promos) => dispatch(addPromos(promos)))
		.catch((error) => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
	type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = (errmess) => ({
	type: ActionTypes.PROMOS_FAILED,
	payload: errmess,
});

export const addPromos = (promos) => ({
	type: ActionTypes.ADD_PROMOS,
	payload: promos,
});

export const fetchLeaders = () => (dispatch) => {
	dispatch(leadersLoading());

	return firestore
		.collection('leaders')
		.get()
		.then((snapshot) => {
			let leaders = [];
			snapshot.forEach((doc) => {
				const data = doc.data();
				const _id = doc.id;
				leaders.push({ _id, ...data });
			});
			return leaders;
		})
		.then((leaders) => dispatch(addLeaders(leaders)))
		.catch((error) => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
	type: ActionTypes.LEADERS_LOADING,
});

export const leadersFailed = (errmess) => ({
	type: ActionTypes.LEADERS_FAILED,
	payload: errmess,
});

export const addLeaders = (leaders) => ({
	type: ActionTypes.ADD_LEADERS,
	payload: leaders,
});

export const postFeedback = (feedback) => (dispatch) => {
	return firestore
		.collection('feedback')
		.add(feedback)
		.then((response) => {
			console.log('Feedback', response);
			alert('Thank you for your feedback!');
		})
		.catch((error) => {
			console.log('Feedback', error.message);
			alert('Your feedback could not be posted\nError: ' + error.message);
		});
};

export const postFavorite = (dishId) => (dispatch) => {
	if (!auth.currentUser) {
		console.log('No user logged in!');
		return;
	}

	return firestore
		.collection('favorites')
		.add({
			user: auth.currentUser.uid,
			dish: dishId,
		})
		.then((docRef) => {
			firestore
				.collection('favorites')
				.doc(docRef.id)
				.get()
				.then((doc) => {
					if (doc.exists) {
						dispatch(fetchFavorites());
					} else {
						// doc.data() will be undefined in this case
						console.log('No such document!');
					}
				});
		})
		.catch((error) => dispatch(favoritesFailed(error.message)));
};

export const deleteFavorite = (dishId) => (dispatch) => {
	if (!auth.currentUser) {
		console.log('No user logged in!');
		return;
	}

	var user = auth.currentUser;

	return firestore
		.collection('favorites')
		.where('user', '==', user.uid)
		.where('dish', '==', dishId)
		.get()
		.then((snapshot) => {
			console.log(snapshot);
			snapshot.forEach((doc) => {
				console.log(doc.id);
				firestore
					.collection('favorites')
					.doc(doc.id)
					.delete()
					.then(() => {
						dispatch(fetchFavorites());
					});
			});
		})
		.catch((error) => dispatch(favoritesFailed(error.message)));
};

export const fetchFavorites = () => (dispatch) => {
	if (!auth.currentUser) {
		console.log('No user logged in!');
		return;
	}

	var user = auth.currentUser;

	dispatch(favoritesLoading(true));

	return firestore
		.collection('favorites')
		.where('user', '==', user.uid)
		.get()
		.then((snapshot) => {
			let favorites = { user: user, dishes: [] };
			snapshot.forEach((doc) => {
				const data = doc.data();
				favorites.dishes.push(data.dish);
			});
			console.log(favorites);
			return favorites;
		})
		.then((favorites) => dispatch(addFavorites(favorites)))
		.catch((error) => dispatch(favoritesFailed(error.message)));
};

export const favoritesLoading = () => ({
	type: ActionTypes.FAVORITES_LOADING,
});

export const favoritesFailed = (errmess) => ({
	type: ActionTypes.FAVORITES_FAILED,
	payload: errmess,
});

export const addFavorites = (favorites) => ({
	type: ActionTypes.ADD_FAVORITES,
	payload: favorites,
});

export const googleLogin = () => (dispatch) => {
	const provider = new fireauth.GoogleAuthProvider();

	auth
		.signInWithPopup(provider)
		.then((result) => {
			var user = result.user;
			localStorage.setItem('user', JSON.stringify(user));
			// Dispatch the success action
			dispatch(fetchFavorites());
			dispatch(receiveLogin(user));
		})
		.catch((error) => {
			dispatch(loginError(error.message));
		});
};
