import { createStore, combineReducers } from "redux";
import { todo_reducer_1 } from "./todos/01_redux/reducer.js";

const reducers = { todo_reducer_1 };
const rootReducer = combineReducers(reducers);

export const storeConfig = () => createStore(rootReducer);
