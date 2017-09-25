import Counter from '../components/Counter';
import Home from '../components/Home';

const states = [
  {
    url: '/',
    name: 'home',
    component: Home,
  },
  {
    url: '/counter',
    name: 'counter',
    component: Counter,
  },
];

export default states;
