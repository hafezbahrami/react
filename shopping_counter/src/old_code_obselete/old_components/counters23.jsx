/// Stateless Functional Components
//  Instead of using a class (like the class we used for navBar component), we want to use a function
//
// Approach:
//         (1) in the NavBar component, we only have a render() method, without any event handler, no
//             helper-method to calculate values , no state={..} and getting all data via props
//         (2) Define a constant called NavBar ==> const NavBar = () ={}, in which we return a react element,
//             ** Basically the whole return statement, previously defined in the class, we move it inside this
//                newly defined function
//         (3) Similar to create a class component where we used "cc with 2 tabs", for a stateless function
//             element, we use "sfc 2 Tabs"
//         (4) In functional component, we need to pass the prps inside the argument, so that we are able to
//             use it inside the function. Then, unlike the class component wehere we used to use "this.prop", here
//             in functional component, we directly use "props" w/o using "this".

import React, { Component } from "react";
import MyComp from "./counter23";

class MyComponents extends Component {
  render() {
    return (
      <div>
        <button
          className="btn btn-primary btn-sm m-2"
          //onClick={this.handleReset}
          onClick={this.props.onReset}
        >
          {" "}
          Reset{" "}
        </button>

        {this.props.list_of_myCounters.map(eachCounter => (
          <MyComp
            key={eachCounter.id}
            selected={true}
            onDelete={this.props.onDelete}
            onIncrement={this.props.onIncrement}
            eachCounter={eachCounter}
          ></MyComp>
        ))}
      </div>
    );
  }
}

export default MyComponents;
