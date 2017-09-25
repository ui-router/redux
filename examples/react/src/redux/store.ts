import { createRouterMiddleware, routerReducer } from '@uirouter/redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger } from 'redux-logger';

import reducers from './reducers';

const logger = createLogger();

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
});

function createRoutedStore(router) {
  const routerMiddleware = createRouterMiddleware(router);
  const store = createStore(reducer, applyMiddleware(routerMiddleware, logger));
  return store;
}

export default createRoutedStore;
