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

class MyComp extends Component {
  constructor(props) {
    super(props);
    // this.doHandleIncrementForPassingArgument = this.doHandleIncrementForPassingArgument.bind(
    //   this
    // );
  }

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
