import { FINISH_TRANSITION, IGNORED_TRANSITION, START_TRANSITION } from './actions';

const initialState = {
  transitioning: false,
  last: {},
};

export const routerReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_TRANSITION: {
      return {
        ...state,
        transitioning: true,
      };
    }
    case FINISH_TRANSITION: {
      return {
        transitioning: false,
        last: action.transition,
      };
    }
    case IGNORED_TRANSITION: {
      return {
        ...state,
        transitioning: false,
      };
    }
    default: {
      return state;
    }
  }
};
