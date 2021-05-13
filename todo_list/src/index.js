import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { storeConfig } from "./store.js";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import App from "./App.js";

export const redux_store = storeConfig();
const persistentReduxStore = persistStore(redux_store);
ReactDOM.render(
  <Provider store={redux_store}>
    <persistGate
      persistor={persistentReduxStore}
      loading={<div> Loading... </div>}
    >
      <App />
    </persistGate>
  </Provider>,
  document.getElementById("root")
);
