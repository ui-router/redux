import { createRouterMiddleware, routerReducer } from '@uirouter/redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import type { UIRouterReact } from '@uirouter/react';

import reducers from './reducers';

const logger = createLogger();

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
});

function createRoutedStore(router: UIRouterReact) {
  const routerMiddleware = createRouterMiddleware(router);
  const store = createStore(reducer, applyMiddleware(routerMiddleware, logger));
  return store;
}

export default createRoutedStore;
