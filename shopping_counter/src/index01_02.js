import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Counters from "./components/counters02";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(<Counters></Counters>, document.getElementById("root"));

serviceWorker.unregister();
