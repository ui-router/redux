import type { Action } from 'redux';
import { DECREASE, INCREASE } from './actions';

type CounterState = {
  value: number;
};

const initialState: CounterState = {
  value: 0,
};

const counter = (state = initialState, action: Action): CounterState => {
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
