import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  todo_reducer_1,
  isLoading_reducer_2,
} from "./todos/03_thunk/reducer.js";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import automergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = { todo_reducer_1, isLoading_reducer_2 };
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
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    composeWithDevTools(applyMiddleware(thunk))
  );
