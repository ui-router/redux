declare var jest, describe, it, expect;

import * as React from "react";
import { shallow, mount, render } from "enzyme";
import {
  UIRouter,
  UIRouterReact,
  ReactStateDeclaration,
  UIView,
  memoryLocationPlugin,
  servicesPlugin,
} from "@uirouter/react";

import { ConnectedUIRouter } from "../index";
import { Provider } from "react-redux";

import { createStore } from "redux";

function reducer(state) {
  return state;
}

describe("ConnectedUIRouter Component", () => {
  let wrapper;
  let router;
  let store;

  const stateA = {
    url: "someurl",
    name: "somename",
    component: () => <div />,
  } as ReactStateDeclaration;

  let defaultProps = {
    states: [stateA],
    plugins: [memoryLocationPlugin],
  };

  beforeEach(() => {
    store = createStore(reducer);
  });

  it("should initialize the router correctly", () => {
    router = new UIRouterReact();
    wrapper = mount(
      <Provider store={store}>
        <ConnectedUIRouter {...defaultProps} router={router}>
          <UIView />
        </ConnectedUIRouter>
      </Provider>
    );
    const routerComponent = wrapper.find(UIRouter);
    expect(routerComponent.length).toBe(1);
    expect(routerComponent.props().router).toBe(router);
  });

  it("should register the states correctly", () => {
    router = new UIRouterReact();
    const spy = jest.spyOn(router.stateRegistry, "register");
    wrapper = mount(
      <Provider store={store}>
        <ConnectedUIRouter {...defaultProps} router={router}>
          <UIView />
        </ConnectedUIRouter>
      </Provider>
    );
    expect(spy).toHaveBeenCalledWith(stateA);
  });

  it("should run the config function", () => {
    const configFn = jest.fn();
    router = new UIRouterReact();
    wrapper = mount(
      <Provider store={store}>
        <ConnectedUIRouter {...defaultProps} router={router} config={configFn}>
          <UIView />
        </ConnectedUIRouter>
      </Provider>
    );
    expect(configFn).toHaveBeenCalledWith(router);
  });

  it("should register the correct plugins", () => {
    router = new UIRouterReact();
    const spy = jest.spyOn(router, "plugin");
    router.wrapper = mount(
      <Provider store={store}>
        <ConnectedUIRouter {...defaultProps} router={router}>
          <UIView />
        </ConnectedUIRouter>
      </Provider>
    );

    const [first, second, third] = router.getPlugin();
    expect(first.name).toBe("vanilla.services");
    expect(second.name).toBe("vanilla.memoryLocation");
    expect(third.name).toBe("redux");
  });

  it("should use store from context for the reduxPlugin", () => {
    const uiRouterReduxCore = require("../../core");
    const spy = jest.spyOn(uiRouterReduxCore, "createReduxPlugin");
    router = new UIRouterReact();
    wrapper = mount(
      <Provider store={store}>
        <ConnectedUIRouter {...defaultProps} router={router}>
          <UIView />
        </ConnectedUIRouter>
      </Provider>
    );
    expect(spy).toHaveBeenCalledWith(store);
  });
});
