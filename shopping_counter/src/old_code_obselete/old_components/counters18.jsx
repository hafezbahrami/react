/// Single source of truth
// Solution: We need to remove the local state={..} in our counter component, and have a single
//           source of truth in the parent compoent (counters)
//           The children component, only relies on props for the data it needs ==> It is called COntrolled Comonent

// Controlled Component: A child component that does not have a local state:
//                       (1) It receives all the data via props from a parent component
//                       (2) And it raises event whenever the data needs to be changes
//                       (3) It is entirelly controlled by its parent

// Solution: (1) Remove the state={..} propert, and all the references this.state.....
//           (2) handling event in the controlled component(here) does not mean any thing, since it raises event and it will be handled by the parent
//           (3) In the Increment button, we just need to raise the event by using props (similar to what we did with Delete button) ==> We will use "onClick={() => this.props.onIncrement}"
//               We can pass the entire counter object "onClick={() => this.props.onIncrement(this.props.eachCounter)}"
//           (4) this.state.value should be replaced with this.props.eachCounter.value
//           (5) Event handler should be added in the parent component ==> handleIncrement
//           (6) In the render of the parent, we need to add onIncrement as a property and set it to {this.handleIncrement}

// test the app at this point, and see it in the console,

import React, { Component } from "react";
import MyComp from "./counter18";

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
    console.log(eachCounter);
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
