// Multi-Components:
// Adding components as an array of multiple "MyComponents" in the state={} property, and then render
// them using the map method
// We want each item in the list to have an id and a value ==> similar to an object of a class
// Each object in the list {id: ??, value: ??}
// When rendering the items in the list, we pass the key={item.id}, to each of components in the list

import React, { Component } from "react";
import MyComponent from "./counter11";

class MyComponents extends Component {
  state = {
    myCounters: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 }
    ]
  };
  render() {
    return (
      <div>
        {this.state.myCounters.map(item => (
          <MyComponent key={item.id} />
        ))}
      </div>
    );
  }
}

export default MyComponents;
