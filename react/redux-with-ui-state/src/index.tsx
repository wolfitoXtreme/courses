import React from "react";
import { render } from "react-dom";

import { Provider } from "react-redux";
import { createStore } from "redux";

import reducer from "./store/reducer";

import Component from "./components/component";
import "./index.scss";

const store = createStore(reducer);

const App = () => {
  return (
    <>
      <h2>Add User</h2>
      <Component />
    </>
  );
};

const rootElement = document.getElementById("root");
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
