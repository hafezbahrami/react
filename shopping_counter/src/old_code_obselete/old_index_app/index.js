import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import MyComponents from "./components/counters15";

//ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(<MyComponents />, document.getElementById("root"));

serviceWorker.unregister();
