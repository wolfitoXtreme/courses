import React from 'react';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware, Middleware, compose } from 'redux';
import { Provider } from 'react-redux';
// import reducer from "./store/reducer"; // moved to reducer folders (splitted reducers)
// import counterReducer from './store/reducers/counter';
// import resultReducer from './store/reducers/result';

import './index.scss';
import App from './App';

// const RootReducer = combineReducers({
//   counterRd: counterReducer,
//   resultRd: resultReducer,
// });

// export type StateType = ReturnType<typeof RootReducer>;
import { RootReducer } from './store/reducers/index';
import { StateType } from './store/reducers/index';

// Middleware
const loggerMD: Middleware<{}, StateType> = (store) => {
  return (next) => {
    return (action) => {
      console.log(
        '[Middleware], Dispatchng',
        action,
        '\n----\n',
        JSON.stringify(store.getState(), null, 2)
      );
      const result = next(action);
      console.log(
        '[Middleware], next state',
        '\n----\n',
        JSON.stringify(store.getState(), null, 2)
      );
      return result;
    };
  };
};

// Chrome Dev tools Extension
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// The store
// const store = createStore(RootReducer, applyMiddleware(loggerMD, thunk));

// ...with Redux Dev Tools Extension
const store = createStore(
  RootReducer,
  composeEnhancers(applyMiddleware(loggerMD, thunk))
);

const rootElement = document.getElementById('root');
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

registerServiceWorker();
