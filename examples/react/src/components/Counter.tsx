import { triggerTransition } from '@uirouter/redux';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { decrease, increase } from '../redux/actions';

type CounterProps = {
  counter: number;
  actions: {
    [key: string]: Function;
  };
};

class Counter extends React.Component<CounterProps, any> {
  onClickIncrement = (): void => {
    const { increase } = this.props.actions;
    increase();
  };

  onClickDecrement = (): void => {
    const { decrease } = this.props.actions;
    decrease();
  };

  onClickNavigate = () => {
    const { triggerTransition } = this.props.actions;
    triggerTransition('home');
  };

  render() {
    const { counter, actions } = this.props;
    const { increase } = actions;
    return (
      <div>
        <div>Here's the beautiful counter: {counter}</div>
        <div>
          <button onClick={this.onClickIncrement}>increase</button>
          <button onClick={this.onClickDecrement}>decrease</button>
        </div>
        <p>
          Or click{' '}
          <b>
            <a onClick={this.onClickNavigate}>here</a>
          </b>{' '}
          to trigger a transition with a redux action
        </p>
      </div>
    );
  }
}

export default connect(
  state => ({
    counter: state.counter.value,
  }),
  dispatch => ({
    actions: bindActionCreators(
      {
        increase,
        decrease,
        triggerTransition,
      },
      dispatch
    ),
  })
)(Counter);
