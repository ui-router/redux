import { UIRouter } from '@uirouter/core';

import { TRIGGER_TRANSITION } from './actions';

export default function createRouterMiddleware(router: UIRouter) {
  return () => next => action => {
    if (action.type !== TRIGGER_TRANSITION) {
      return next(action);
    }

    const { to, params } = action;
    router.stateService.go(to, params);
  };
}
