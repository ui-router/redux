# UI-Router-Redux (WIP)

Keep UI-Router and Redux state in sync. This library does the following things:

* dispatch a Redux action each time a transition occurs.
* keep transitioning information in state
* (not implemented yet) trigger router transitions via redux actions

**NB: There is nothing preventing you from using Redux in combination with the router right now, as you can simply `connect()` your "state components" and that's it.**

## Getting started

Add the router reducer in your store creation to access routing info:

```jsx
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {routerReducer} from 'ui-router-redux';

import * as someReducers from './reducers';

const reducer = combineReducers({
  ...someReducers,
  routing: routerReducer
});

const store = createStore(
  reducer,
  applyMiddleware(logger)
);
```

Than you need to create the router plugin using the Redux state:

**React:**
```jsx
// •••

const reduxPlugin = createReduxPlugin(store);

const plugins = [
  pushStateLocationPlugin,
  reduxPlugin
];

// •••

<UIRouter plugins={plugins} states={states}>
  <UIView />
</UIRouter>
```