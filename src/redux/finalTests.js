import * as ActionTypes from './ActionTypes';

export const FinalTests = (
	state = {
		isLoading: true,
		errMess: null,
		finalTests: [],
	},
	action
) => {
	switch (action.type) {
		case ActionTypes.ADD_FINALTESTS:
			return {
				...state,
				isLoading: false,
				errMess: null,
				finalTests: action.payload,
			};

		case ActionTypes.FINALTESTS_LOADING:
			return { ...state, isLoading: true, errMess: null, finalTests: [] };

		case ActionTypes.FINALTESTS_FAILED:
			return {
				...state,
				isLoading: false,
				errMess: action.payload,
				finalTests: [],
			};

		default:
			return state;
	}
};
