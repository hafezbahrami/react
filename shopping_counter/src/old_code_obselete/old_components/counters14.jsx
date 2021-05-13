// Adding a "Delete" Button

// Delete event handler for the downstream component (counter14.jsx) will be done in the upstream component
// which is here

// we will pass the reference of "handleDelete" through the child component of props
// onDelete={this.handleDelete}

import React, { Component } from "react";
import MyComp from "./counter14";

class MyComponents extends Component {
  state = {
    myCounters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 }
    ]
  };
  handleDelete() {
    console.log(
      "Delete Event Handler from a child/downstream component got called!"
    );
  }

  render() {
    return (
      <div>
        {this.state.myCounters.map(item => (
          <MyComp
            key={item.id}
            value={item.value}
            selected={true}
            id={item.id}
            onDelete={this.handleDelete}
          >
            {/* <h4>MyPooooorComp #{item.id}</h4> */}
          </MyComp>
        ))}
      </div>
    );
  }
}

export default MyComponents;
