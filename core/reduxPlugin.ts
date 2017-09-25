import { UIRouter } from '@uirouter/core';
import { Store } from 'redux';

import { applyHooks } from './applyHooks';
import { ReduxPlugin } from './interface';

export function reduxPluginFactory(name: string, store: Store<any>) {
  return function(router: UIRouter): ReduxPlugin {
    // sync should return function to deregister hooks
    const removeHooks = applyHooks(router, store);

    function dispose(router: UIRouter) {
      removeHooks();
    }

    return { name, store, dispose };
  };
}

export const createReduxPlugin: (
  store: Store<any>
) => (router: UIRouter) => ReduxPlugin = store => {
  return reduxPluginFactory('redux', store);
};
