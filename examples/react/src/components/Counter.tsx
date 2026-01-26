import { triggerTransition } from '@uirouter/redux';
import { useSelector, useDispatch } from 'react-redux';

import { decrease, increase } from '../redux/actions';

type RootState = {
  counter: { value: number };
};

const Counter = () => {
  const counter = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const onClickIncrement = () => {
    dispatch(increase());
  };

  const onClickDecrement = () => {
    dispatch(decrease());
  };

  const onClickNavigate = () => {
    dispatch(triggerTransition('home'));
  };

  return (
    <div>
      <div>Here's the beautiful counter: {counter}</div>
      <div>
        <button onClick={onClickIncrement}>increase</button>
        <button onClick={onClickDecrement}>decrease</button>
      </div>
      <p>
        Or click <b><a onClick={onClickNavigate}>here</a></b> to trigger a transition with a redux action
      </p>
    </div>
  );
};

export default Counter;
