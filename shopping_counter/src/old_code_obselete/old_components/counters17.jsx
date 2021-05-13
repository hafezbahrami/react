/// Single source of truth
// We want to add a button at the lower part of all 4 previous buttons, to reset all these
// 4 buttons
// button.btn.btn-primary.btm-sm.m-2  ==> Let's call it Reset
// Let's handle onClick event for this button

// With the code below, if we hit the Reset button, we do not see any changes in
// the UI. But if we debug the code in the browser, we will see that "in the component" Tab,
// if we see for "MyComponents", all values are set to zero, as we wanted. But, why we
// do not see it in the UI? ==> Since we do not have a single source of truth
// Back in the browser, if we see each individual component inside the "MyComponent", we
// will see that they hold the old value and not updated.

// The key point is that the state={..} will be created once and that is when the component
// is created, will never changed after
// Changing the vaue of a button by hitting it, is all happening in local, and in local
// state can change... but the Reset button is not local and cannot change the state={..} in
// another component

// Key point: Look at the "component" in the debug mode, in the browser, look at the value
//            of each component at the state section, also in the props section look at the
//            value noted in the eachCounter passed by the parent component. You will realize
//            that state is local and cannot be changed by the parent component

import React, { Component } from "react";
import MyComp from "./counter17";

class MyComponents extends Component {
  state = {
    myCounters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
  };
  handleDelete = (hittedCounterID) => {
    const my_Counters = this.state.myCounters.filter(
      (c) => c.id !== hittedCounterID
    );
    this.setState({ myCounters: my_Counters });
    console.log(hittedCounterID);
  };

  handleReset = () => {
    const newSetsOfCounters = this.state.myCounters.map((item) => {
      item.value = 0;
      return item;
    });
    this.setState({ myCounters: newSetsOfCounters });
  };

  render() {
    console.log("I am here");
    return (
      <div>
        <button
          className="btn btn-primary btn-sm m-2"
          onClick={this.handleReset}
        >
          {" "}
          Reset{" "}
        </button>

        {this.state.myCounters.map((eachCounter) => (
          <MyComp
            key={eachCounter.id}
            //selected={true}
            onDelete={this.handleDelete}
            eachCounter={eachCounter}
          ></MyComp>
        ))}
      </div>
    );
  }
}

export default MyComponents;
