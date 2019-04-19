import { UIRouter } from "@uirouter/core";
import { Store } from "redux";

import { applyHooks } from "./applyHooks";
import { ReduxPlugin } from "./interface";

export type ReduxPluginApplyFn = (router: UIRouter) => ReduxPlugin;

export function reduxPluginFactory(
  name: string,
  store: Store<any>
): ReduxPluginApplyFn {
  return function(router) {
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
) => ReduxPluginApplyFn = store => {
  return reduxPluginFactory("redux", store);
};
