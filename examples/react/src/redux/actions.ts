import { Action, ActionCreator } from 'redux';

export const INCREASE = 'INCREASE';
export const DECREASE = 'DECREASE';

export const increase: ActionCreator<Action> = () => ({
  type: INCREASE,
});

export const decrease: ActionCreator<Action> = () => ({
  type: DECREASE,
});
