import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import appReducer from './reducers/index';

const store = createStore(appReducer,
    window.devToolsExtension ? window.devToolsExtension() : f => f,
    process.env.NODE_ENV === 'production'
      ? applyMiddleware(thunk)
      : applyMiddleware(thunk, createLogger())
  );
export default store;  