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

class MyComp extends Component {
  my_styles = {
    fontSize: 12,
    fontWeight: "bold"
  };

  render() {
    let my_attr_classes = this.getBadgeClasses();
    console.log("props", this.props);

    return (
      <div>
        <span style={this.my_styles} className={my_attr_classes}>
          {this.MyFunction()}
        </span>
        <button
          onClick={() => this.props.onIncrement(this.props.eachCounter)}
          style={{ fontSize: 12 }}
          className="btn btn-secondary btn-sm"
        >
          MyButton
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.eachCounter.id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      </div>
    );
  }

  getBadgeClasses() {
    let my_attr_classes = " badge m-2 badge-";
    my_attr_classes +=
      this.props.eachCounter.value === 0 ? "warning" : "primary";
    return my_attr_classes;
  }

  MyFunction() {
    const { value: count } = this.props.eachCounter;
    return count === 0 ? "Zero" : count;
  }
}

export default MyComp;
