// Multi-Components:
// Adding ultiple components as JSX directy into the render method

import React, { Component } from "react";
import MyComp from "./counter11";

class MyComponents extends Component {
  state = {};
  render() {
    return (
      <div>
        <MyComp />
        <MyComp />
        <MyComp />
        <MyComp />
        <MyComp />
      </div>
    );
  }
}

export default MyComponents;
