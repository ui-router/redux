import {
  START_TRANSITION,
  IGNORED_TRANSITION,
  REDIRECTED_TRANSITION,
  FINISH_TRANSITION
} from './actions';

const initialState = {
  transitioning: false,
  current: {}
}

export const routerReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_TRANSITION: {
      return {
        ...state,
        transitioning: true
      }
    }
    case FINISH_TRANSITION: {
      return {
        transitioning: false,
        last: action.transition.to()
      }
    }
    case IGNORED_TRANSITION: {
      return {
        ...state,
        transitioning: false
      }
    }
    default: {
      return state;
    }
  }
}