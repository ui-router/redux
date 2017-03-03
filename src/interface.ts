/**
 * @internalapi
 * @module core
 */ /** */
import { UIRouterPlugin } from 'ui-router-core';

export interface ReduxPlugin extends UIRouterPlugin {
  store: any
}