import { createStore, combineReducers } from "redux";
import { todo_reducer_1 } from "./todos/01_redux/reducer.js";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import automergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const reducers = { todo_reducer_1 };
const rootReducer = combineReducers(reducers);

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: automergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const storeConfig = () =>
  createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
