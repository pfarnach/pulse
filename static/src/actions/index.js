import types from '../constants/types';

export function addCoord(coord) {
	return {
		type: types.ADD_COORD,
		payload: coord
	};
}