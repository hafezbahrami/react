import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Counter from "./components/counter00";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(<Counter></Counter>, document.getElementById("root"));

serviceWorker.unregister();
