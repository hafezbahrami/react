// Props vs State
// "props" includes data that we give to our component, while state constains data that is
// local or private to that component. Other Component cannot access that state, and is completely
// private to that component.

// Whatever we pass to a component within  <MyComp ??? ???? ???? > , these ??? counts as props in
// the receiver component

// We cannot access to the state of MyComp component, since the state is local and private to MyComp class

// "props" are only read-only, and cannot be changed

import React, { Component } from "react";
import MyComp from "./counter13";

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
          <MyComp key={item.id} value={item.value} selected={true} id={item.id}>
            {/* <h4>MyPooooorComp #{item.id}</h4> */}
          </MyComp>
        ))}
      </div>
    );
  }
}

export default MyComponents;
