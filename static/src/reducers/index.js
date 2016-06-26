import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import coordReducer from './coord-reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  coords: coordReducer
});

export default rootReducer;
