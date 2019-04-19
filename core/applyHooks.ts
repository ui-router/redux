/**
  * @module core
  */ /** */
import { HookResult, Transition, TransitionHookFn, UIRouter } from '@uirouter/core';
import { Rejection, RejectType } from '@uirouter/core';
import { Store } from 'redux';

import {
  FINISH_TRANSITION,
  IGNORED_TRANSITION,
  REDIRECTED_TRANSITION,
  START_TRANSITION,
  SUCCESS_TRANSITION,
} from "./actions";

/** @hidden */
const hookResult: HookResult = true;

/** @hidden */
const noop = () => {};

/**
 * Dispatch Redux event
 *
 * Creates a function that when called dispatches a Redux action with the transition info.
 *
 * @param event The event name
 * @param store The redux store
 * @param trans The Transition
 */
function dispatch(
  event: string,
  store: Store<any>,
  trans: Transition
): () => void {
  return function() {
    store.dispatch({ type: event, transition: trans });
  };
}

function handleTransitionError(
  trans: Transition,
  store: Store<any>
): (err: Rejection) => void {
  return function(err: Rejection) {
    let dispatcher;
    if (err.type === RejectType.SUPERSEDED && err.redirected === true) {
      dispatcher = dispatch(REDIRECTED_TRANSITION, store, trans);
    } else if ((err.type = RejectType.IGNORED)) {
      dispatcher = dispatch(IGNORED_TRANSITION, store, trans);
    } else {
      dispatcher = noop;
    }
    dispatcher();
  };
}

/**
 * Applies hooks to Transitions
 *
 * Registers hooks for every Transition and dispatches Redux events to sync it.
 *
 * @param router The Router instance
 * @param store The Redux store
 * @returns A function for removing the event listeners
 */
export function applyHooks(router: UIRouter, store: Store<any>): Function {
  const { transitionService } = router;
  const removeHooksFunctions: Function[] = [];

  const removeMainHook = transitionService.onBefore({}, (trans: Transition) => {
    // Create a hook for the ends of the transition
    const dispatchOnStart = dispatch(START_TRANSITION, store, trans);
    const dispatchOnFinish = dispatch(FINISH_TRANSITION, store, trans);
    const dispatchOnSuccess = dispatch(SUCCESS_TRANSITION, store, trans);

    removeHooksFunctions.push(trans.onStart({}, dispatchOnStart));
    removeHooksFunctions.push(trans.onFinish({}, dispatchOnFinish));
    removeHooksFunctions.push(trans.onSuccess({}, dispatchOnSuccess));

    trans.promise.then(noop, handleTransitionError(trans, store));
  });

  return function() {
    removeMainHook();
    removeHooksFunctions.forEach(fn => fn());
  };
}
