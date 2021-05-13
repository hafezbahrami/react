/// Destructuring Argument

// Goal: If in a funtional code, we want to use props alot, we can destructure it to simply the use of props.
// Approach:
//          (1) In the navBar functional component, we use props.totalCountersGreatThan0, by passing the props
//              as argument to the funtion
//          (2) We can destructure this, and pass {totalCountersGreatThan0} as the argument to the function
//              directly ans use it

// Destructuring in class Component:
//          (1) In the counters, MyComponents, component, right inder the render(), we define a constant as:
//              search for all "this.props...", and include them like this:
//              const { onReset, list_of_myCounters, onDelete, onIncrement } = this.props;
//          (2) Then, remove all the "this.props." from whereever inside the class we mentioned.

import React, { Component } from "react";
import MyComp from "./counter24";

class MyComponents extends Component {
  render() {
    const { onReset, list_of_myCounters, onDelete, onIncrement } = this.props;
    return (
      <div>
        <button
          className="btn btn-primary btn-sm m-2"
          //onClick={this.props.onReset}
          onClick={onReset}
        >
          {" "}
          Reset{" "}
        </button>

        {/* {this.props.list_of_myCounters.map(eachCounter => ( */}
        {list_of_myCounters.map(eachCounter => (
          <MyComp
            key={eachCounter.id}
            selected={true}
            // onDelete={this.props.onDelete}
            onDelete={onDelete}
            // onIncrement={this.props.onIncrement}
            onIncrement={onIncrement}
            eachCounter={eachCounter}
          ></MyComp>
        ))}
      </div>
    );
  }
}

export default MyComponents;
