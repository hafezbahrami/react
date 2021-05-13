import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { storeConfig } from "./store.js";
import App from "./App.js";

const redux_store = storeConfig();
ReactDOM.render(
  <Provider store={redux_store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
