import { combineReducers } from 'redux';
import appReducer from './app-reducer';
import moviesReducer from './movies-reducer';

const app = combineReducers({
    appReducer,
    moviesReducer,
});

export default app;