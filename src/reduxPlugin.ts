import { UIRouter } from 'ui-router-core';
import { Store } from 'redux';
import { ReduxPlugin } from './interface';

import { applyHooks } from './applyHooks';

export function reduxPluginFactory(
  name: string,
  store: Store<any>
){
  return function (router: UIRouter): ReduxPlugin {
    // sync should return function to deregister hooks
    const removeHooks = applyHooks(router, store);

    function dispose(router: UIRouter) {
      removeHooks();
    }

    return { name, store, dispose };
  }
}

export const createReduxPlugin: (store: Store<any>) => (router: UIRouter) => ReduxPlugin = (store) => {
  return reduxPluginFactory('redux', store);
}