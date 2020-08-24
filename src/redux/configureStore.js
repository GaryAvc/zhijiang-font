import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { FinalTests } from './finalTests';
import { Auth } from './auth';
import { Records } from './records';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';
import { Ranks } from './ranks';

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			dishes: Dishes,
			comments: Comments,
			promotions: Promotions,
			leaders: Leaders,
			auth: Auth,
			records: Records,
			ranks: Ranks,
			finalTests: FinalTests,
			...createForms({
				feedback: InitialFeedback,
			}),
		}),
		applyMiddleware(thunk, logger)
	);

	return store;
};
