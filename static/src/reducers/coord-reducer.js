import types from '../constants/types';
import _ from 'lodash';

export default function(state = [], action) {
	switch (action.type) {
		case types.ADD_COORD:
			return _.uniqBy([...state, action.payload], 'id');
		default:
			return state;
	}
}