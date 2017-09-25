import { DECREASE, INCREASE } from './actions';

const initialState = {
  value: 0,
};

const counter = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE: {
      return {
        value: state.value + 1,
      };
    }
    case DECREASE: {
      return {
        value: state.value - 1,
      };
    }
    default:
      return state;
  }
};

export default {
  counter,
};
