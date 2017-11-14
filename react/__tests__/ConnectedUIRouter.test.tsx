declare var jest, describe, it, expect, beforeEach;

import * as React from 'react';
import * as PropTypes from 'prop-types';
import {shallow, mount, render} from 'enzyme';
import { UIRouter, UIRouterReact, ReactStateDeclaration, UIView, memoryLocationPlugin, servicesPlugin } from '@uirouter/react';

import { ConnectedUIRouter } from '../index';

describe('ConnectedUIRouter Component', () => {
  let wrapper;
  let router;

  const stateA = {
    url: 'someurl',
    name: 'somename',
    component: () => <div />
  } as ReactStateDeclaration;

  const context = {
    store: {}
  };

  let defaultProps = {
    states: [stateA],
    plugins: [memoryLocationPlugin],
  };

  it('should initialize the router correctly', () => {
    router = new UIRouterReact();
    wrapper = mount((
      <ConnectedUIRouter {...defaultProps} router={router}>
        <UIView />
      </ConnectedUIRouter>
    ), { context });
    const routerComponent = wrapper.find(UIRouter);
    expect(routerComponent.length).toBe(1);
    expect(routerComponent.props().router).toBe(router);
  });

  it('should register the states correctly', () => {
    router = new UIRouterReact();
    const spy = jest.spyOn(router.stateRegistry, 'register');
    wrapper = mount((
      <ConnectedUIRouter {...defaultProps} router={router}>
        <UIView />
      </ConnectedUIRouter>
    ), { context });
    expect(spy).toHaveBeenCalledWith(stateA);
  });

  it('should run the config function', () => {
    const configFn = jest.fn();
    router = new UIRouterReact();
    wrapper = mount((
      <ConnectedUIRouter {...defaultProps} router={router} config={configFn}>
        <UIView />
      </ConnectedUIRouter>
    ), { context });
    expect(configFn).toHaveBeenCalledWith(router);
  });

  it('should register the correct plugins', () => {
    router = new UIRouterReact();
    const spy = jest.spyOn(router, 'plugin');
    wrapper = mount((
      <ConnectedUIRouter {...defaultProps} router={router}>
        <UIView />
      </ConnectedUIRouter>
    ), { context });
    const reduxPlugin = wrapper.instance().reduxPlugin;
    expect(spy).toHaveBeenCalledWith(memoryLocationPlugin);
    expect(spy).toHaveBeenCalledWith(servicesPlugin);
    expect(spy).toHaveBeenCalledWith(reduxPlugin);
  });

  it('should use store from context for the reduxPlugin', () => {
    const uiRouterReduxCore = require('../../core');
    const spy = jest.spyOn(uiRouterReduxCore, 'createReduxPlugin');
    router = new UIRouterReact();
    wrapper = mount((
      <ConnectedUIRouter {...defaultProps} router={router}>
        <UIView />
      </ConnectedUIRouter>
    ), { context });
    expect(spy).toHaveBeenCalledWith(context.store);
  });
});
