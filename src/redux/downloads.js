import * as ActionTypes from './ActionTypes';

export const Downloads = (
	state = {
		isLoading: true,
		errMess: null,
		downloads: [],
	},
	action
) => {
	switch (action.type) {
		case ActionTypes.ADD_DOWNLOADS:
			return {
				...state,
				isLoading: false,
				errMess: null,
				downloads: action.payload,
			};

		case ActionTypes.DOWNLOADS_LOADING:
			return { ...state, isLoading: true, errMess: null, downloads: [] };

		case ActionTypes.DOWNLOADS_FAILED:
			return {
				...state,
				isLoading: false,
				errMess: action.payload,
				downloads: [],
			};

		default:
			return state;
	}
};
