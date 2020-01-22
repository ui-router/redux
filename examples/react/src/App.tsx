import {
  pushStateLocationPlugin,
  UIRouterReact,
  UISref,
  UIView,
} from "@uirouter/react";
import { ConnectedUIRouter } from "@uirouter/redux/react";
import * as React from "react";
import { Provider } from "react-redux";

import createRoutedStore from "./redux/store";
import states from "./router/states";

const router = new UIRouterReact();
const store = createRoutedStore(router);

const App = () => (
  <Provider store={store}>
    <ConnectedUIRouter
      router={router}
      plugins={[pushStateLocationPlugin]}
      states={states}
    >
      <div className="main">
        <nav className="menu">
          <ul>
            <UISref to="home">
              <a>
                <li>home</li>
              </a>
            </UISref>
            <UISref to="counter">
              <a>
                <li>counter</li>
              </a>
            </UISref>
          </ul>
        </nav>
        <div className="content">
          <UIView />
        </div>
      </div>
    </ConnectedUIRouter>
  </Provider>
);

export default App;
