/// Updating the state, in event handling for a "Delete" Button

// As said, we do not update the state={} directly => we are not going to remove a counter from myCounters lsit
// instead we use create a new array, except the deleted one. Then call "setState" to overwrite the
// myCounters property with my_Counters

import React, { Component } from "react";
import MyComp from "./counter15";

class MyComponents extends Component {
  state = {
    myCounters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 }
    ]
  };
  handleDelete = hittedCounterID => {
    const my_Counters = this.state.myCounters.filter(
      c => c.id !== hittedCounterID
    );
    this.setState({ myCounters: my_Counters });
  };

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
