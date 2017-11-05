# UI-Router Redux

<a href="https://www.npmjs.org/package/@uirouter/redux">
  <img src="https://img.shields.io/npm/v/@uirouter/redux.svg?style=flat-square">
</a>

Keep UI-Router and Redux state in sync.

## Introduction

UI-Router works well combined with Redux.
You just need to `connect()` your routed components and they can access the application state as you would expect, as well as dispatch actions.

But you might want to do some more advanced stuff, like leveraging router transitions as actions for your reducers, or trigger router transitions via redux actions.

What you can do with this library:

* Dispatch a Redux action each time a transition occurs
* Keep transitioning information in Redux state
* Trigger router transitions via Redux actions

## How it works

The library exposes a *core* `UI-Router plugin`, a `reducer`, a `middleware` and an `action creator`.
The *core* is framework agnostic, works directly with Redux and UI-Router and can be used anywhere.

It also exposes framework specific components to help integrate better the plugin in your applications.
The current framework implementations are:

* React

## Getting started

Depending on the framework you're using, the initial boilerplate may differ a bit.

### Installation

The package is publish on the `npm` repository and can be installed using `yarn` or `npm`.

```
yarn add @uirouter/redux
```

### React

```jsx
import { pushStateLocationPlugin, UIRouterReact, UIView } from '@uirouter/react';
import { createRouterMiddleware, routerReducer } from '@uirouter/redux';
import { ConnectedUIRouter } from '@uirouter/redux/lib/react';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

// Instantiate the Router
const router = new UIRouterReact();

// Create the Redux middleware by passing it
const routerMiddleware = createRouterMiddleware(router);

// Create the Redux reducer
const reducer = combineReducers({
  // ... your reducers
  router: routerReducer,
});

// And finally create the Redux store
const store = createStore(reducer, applyMiddleware(routerMiddleware));

// Use the ConnectedUIRouter component and pass it the
// router instance. It will get the Redux store from
// the React Context and apply the plugin for you
const app = (
  <Provider store={store}>
    <ConnectedUIRouter
      router={router}
      plugins={[pushStateLocationPlugin]}
      states={states}
    >
      <UIView />
    </ConnectedUIRouter>
  </Provider>
);
```

## Development

Clone the library and install the dependencies with `npm install` or `yarn`.

You can run the React example with `yarn start` but you need to go into `examples/react` and install the dependencies there as well.

## Building the library

To build the library just install the dependencies and run the `build` script:

```bash
yarn install
yarn build
```
