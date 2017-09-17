export const TRIGGER_TRANSITION = '@ui-router/TRIGGER_TRANSITION';
export const START_TRANSITION = '@ui-router/START_TRANSITION';
export const IGNORED_TRANSITION = '@ui-router/IGNORED_TRANSITION';
export const REDIRECTED_TRANSITION = '@ui-router/REDIRECTED_TRANSITION';
export const FINISH_TRANSITION = '@ui-router/FINISH_TRANSITION';

export const triggerTransition = (to, params) => {
  return {
    type: TRIGGER_TRANSITION,
    to,
    params
  }
}