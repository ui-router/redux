import {TRIGGER_TRANSITION} from './actions';

export default function routerMiddleware(router) {
  return () => next => action => {
    if (action.type !== TRIGGER_TRANSITION) {
      return next(action);
    }

    const { to, params } = action;
    // TODO: trigger transition
  }
}