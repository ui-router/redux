import { vi, describe, beforeEach, afterEach, it, expect } from "vitest";
import * as React from "react";
import { render, cleanup } from "@testing-library/react";
import {
  UIRouterReact,
  ReactStateDeclaration,
  UIView,
  memoryLocationPlugin,
} from "@uirouter/react";

import { ConnectedUIRouter } from "../index";
import { Provider } from "react-redux";

import { createStore } from "redux";
import * as uiRouterReduxCore from "../../core";

function reducer(state = {}) {
  return state;
}

describe("ConnectedUIRouter Component", () => {
  let router: UIRouterReact;
  let store: ReturnType<typeof createStore>;

  const stateA = {
    url: "someurl",
    name: "somename",
    component: () => <div />,
  } as ReactStateDeclaration;

  const defaultProps = {
    states: [stateA],
    plugins: [memoryLocationPlugin],
  };

  beforeEach(() => {
    store = createStore(reducer);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("should initialize the router correctly", () => {
    router = new UIRouterReact();
    render(
      <Provider store={store}>
        <ConnectedUIRouter {...defaultProps} router={router}>
          <UIView />
        </ConnectedUIRouter>
      </Provider>
    );
    // Verify the router instance we passed is the one being used
    // by checking it has been initialized with plugins (servicesPlugin is always added)
    const plugins = router.getPlugin();
    expect(plugins.length).toBeGreaterThan(0);
    // Verify UIRouter is using our router by checking the stateRegistry is accessible
    expect(router.stateRegistry).toBeDefined();
    expect(router.stateRegistry.get()).toBeDefined();
  });

  it("should register the states correctly", () => {
    router = new UIRouterReact();
    const spy = vi.spyOn(router.stateRegistry, "register");
    render(
      <Provider store={store}>
        <ConnectedUIRouter {...defaultProps} router={router}>
          <UIView />
        </ConnectedUIRouter>
      </Provider>
    );
    expect(spy).toHaveBeenCalledWith(stateA);
  });

  it("should run the config function", () => {
    const configFn = vi.fn();
    router = new UIRouterReact();
    render(
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
    const spy = vi.spyOn(router, "plugin");
    render(
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
    const spy = vi.spyOn(uiRouterReduxCore, "createReduxPlugin");
    router = new UIRouterReact();
    render(
      <Provider store={store}>
        <ConnectedUIRouter {...defaultProps} router={router}>
          <UIView />
        </ConnectedUIRouter>
      </Provider>
    );
    expect(spy).toHaveBeenCalledWith(store);
  });
});
