import React, { Component } from "react";
//import logo from './logo.svg';
import NavBar from "./components/navbar";
import "./App.css";
import MyComponents from "./components/counters20";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <main>
          <MyComponents />
        </main>
      </div>
    );
  }
}

export default App;
