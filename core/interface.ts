/**
 * @internalapi
 * @module core
 */ /** */
import { UIRouterPlugin } from '@uirouter/core';

export interface ReduxPlugin extends UIRouterPlugin {
  store: any;
}
