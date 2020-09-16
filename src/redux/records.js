import * as ActionTypes from './ActionTypes';

export const Records = (
	state = {
		isLoading: true,
		errMess: null,
		records: [],
	},
	action
) => {
	switch (action.type) {
		case ActionTypes.ADD_RECORDS:
			return {
				...state,
				isLoading: false,
				errMess: null,
				records: action.payload,
			};

		case ActionTypes.RECORDS_LOADING:
			return { ...state, isLoading: true, errMess: null, records: [] };

		case ActionTypes.RECORDS_FAILED:
			return {
				...state,
				isLoading: false,
				errMess: action.payload,
				records: [],
			};

		default:
			return state;
	}
};
