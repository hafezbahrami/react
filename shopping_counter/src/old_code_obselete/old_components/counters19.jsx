/// Single source of truth 2

//Goal: Let's update the state in the parent component:
//      (1) Cloning the already available array of counters by "const myCounters = [...this.state.myCounters];"
//      (2) Since myCounters is exactly same array as myCounter defined in the state={..}, whatever changes in myCounters, will be reflected in myCounter of state={..}
//      (3)     const myCounters = [...this.state.myCounters];
//              myCounters[0].value++;
//              console.log(this.state.myCounters[0]);
//           ** With 3 lines above inside the handleIncrement, we modify the state, which usually not easy in React
//       (4) now we can clone the incoming received counter
//           ** we can get into he index of myCounter from the index of incoming/received counter
//       (5) last piece, is to update the state with "setState"
import React, { Component } from "react";
import MyComp from "./counter19";

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

  handleReset = () => {
    const newSetsOfCounters = this.state.myCounters.map(item => {
      item.value = 0;
      return item;
    });
    this.setState({ myCounters: newSetsOfCounters });
  };
  handleIncrement = eachCounter => {
    //console.log(eachCounter);
    const myCounters = [...this.state.myCounters]; // clone the myCounters in the state={..} right here
    const index = myCounters.indexOf(eachCounter);
    myCounters[index] = { ...eachCounter }; // Here, we say, the myCounter that we just clone in the above line, the item[0] of it to be cloned with the received counter.
    myCounters[index].value++;
    console.log(this.state.myCounters[index]); // With 2 lines above I do not expect the "myCounter in the state={..}" to be changed
    this.setState({ myCounters });
  };

  render() {
    return (
      <div>
        <button
          className="btn btn-primary btn-sm m-2"
          onClick={this.handleReset}
        >
          {" "}
          Reset{" "}
        </button>

        {this.state.myCounters.map(eachCounter => (
          <MyComp
            key={eachCounter.id}
            selected={true}
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
            eachCounter={eachCounter}
          ></MyComp>
        ))}
      </div>
    );
  }
}

export default MyComponents;
