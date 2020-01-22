import { servicesPlugin, UIRouter, UIRouterProps } from "@uirouter/react";
import { ReactReduxContext } from "react-redux";
import * as React from "react";
import { useContext, useRef } from "react";

import { createReduxPlugin } from "../core";

interface ConnectedUIRouterProps extends UIRouterProps {
  children: React.ReactElement;
}

export function ConnectedUIRouter({
  children,
  router: routerFromProps,
  plugins,
  config,
  states,
}: ConnectedUIRouterProps) {
  const init = useRef(false);

  const { store } = useContext(ReactReduxContext);
  const router = useRef(routerFromProps);
  const reduxPlugin = useRef(createReduxPlugin(store));

  // let's initialise the plugins and set up the router
  if (init.current !== true) {
    // services plugin is necessary for UIRouter to function
    router.current.plugin(servicesPlugin);
    // apply all the plugins that are passed via props
    plugins.forEach(plugin => router.current.plugin(plugin));
    // apply the newly created redux plugin
    router.current.plugin(reduxPlugin.current);

    if (config) config(router.current);
    (states || []).forEach(state =>
      router.current.stateRegistry.register(state)
    );

    init.current = true;
  }

  return <UIRouter router={router.current}>{children}</UIRouter>;
}
