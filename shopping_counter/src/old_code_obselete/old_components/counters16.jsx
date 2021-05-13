/// passing the entire counter object, rather than a specific elemnt of that
// So in the future, all (here id and value) will be accessible with no additional code

import React, { Component } from "react";
import MyComp from "./counter16";

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
        {/* {this.state.myCounters.map(item => (
          <MyComp
            key={item.id}
            value={item.value}
            selected={true}
            id={item.id}
            onDelete={this.handleDelete}
          ></MyComp> */}

        {this.state.myCounters.map(eachCounter => (
          <MyComp
            key={eachCounter.id}
            selected={true}
            onDelete={this.handleDelete}
            eachCounter={eachCounter}
          ></MyComp>
        ))}
      </div>
    );
  }
}

export default MyComponents;
