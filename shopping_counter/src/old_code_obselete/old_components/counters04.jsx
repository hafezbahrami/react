// react children
// We could add another react-element when we call each component of "MyCom" class
// here we pass a children, from "h4" type =>  <h4>Title</h4>
// In the console we can see this

import React, { Component } from "react";
import MyComp from "./counter12";

class MyComponents extends Component {
  state = {
    myCounters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 }
    ]
  };
  render() {
    return (
      <div>
        {this.state.myCounters.map(item => (
          <MyComp key={item.id} value={item.value} selected={true}>
            <h4>Title</h4>
          </MyComp>
        ))}
      </div>
    );
  }
}

export default MyComponents;
