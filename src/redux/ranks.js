import * as ActionTypes from './ActionTypes';

export const Ranks = (
	state = {
		isLoading: true,
		errMess: null,
		ranks: [],
	},
	action
) => {
	switch (action.type) {
		case ActionTypes.ADD_RANKS:
			return {
				...state,
				isLoading: false,
				errMess: null,
				ranks: action.payload,
			};

		case ActionTypes.RANKS_LOADING:
			return { ...state, isLoading: true, errMess: null, ranks: [] };

		case ActionTypes.RANKS_FAILED:
			return {
				...state,
				isLoading: false,
				errMess: action.payload,
				ranks: [],
			};

		default:
			return state;
	}
};
