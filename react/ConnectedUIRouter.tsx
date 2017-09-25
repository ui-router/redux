import { servicesPlugin, UIRouter, UIRouterProps } from '@uirouter/react';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { createReduxPlugin } from '../core';

export class ConnectedUIRouter extends React.Component<UIRouterProps, any> {
  reduxPlugin;
  router;

  static contextTypes = {
    store: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.reduxPlugin = createReduxPlugin(context.store);
    this.router = props.router;
    this.router.plugin(servicesPlugin);
    props.plugins.forEach(plugin => this.router.plugin(plugin));
    this.router.plugin(this.reduxPlugin);
    if (props.config) props.config(this.router);
    (props.states || []).forEach(state =>
      this.router.stateRegistry.register(state)
    );
  }

  render() {
    const { children } = this.props;
    return <UIRouter router={this.router}>{children}</UIRouter>;
  }
}
