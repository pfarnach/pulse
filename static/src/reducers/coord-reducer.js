import types from '../constants/types';

export default function(state = [], action) {
	switch (action.type) {
		case types.ADD_COORD:
			return [...state, action.payload];
		default:
			return state;
	}
}