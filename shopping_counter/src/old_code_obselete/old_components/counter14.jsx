/// Adding a "Delete" Button
// Adding bootdtrap className to the button:
// btn-danger ==> to make the button red  &&&&  btn-sm ==> to make the buttom small  && m-2 ==> adding margin

// Adding Event to the Button:
// onClick event ==> onClick={this.handleDelete}
// problem: in this call, in the state={}, we only have access to value property

// React Rule: The component that owns the state, should be the one that modifies it.
// If you look at the "MyCounters" that is part of the state={} of the counters07.jsx file, not the state here. So,
// we should not be able to modify the data in the state={} in counter07.jsx file. Adding a new counter, or removing
// from the "MyCounters" list should be done in counters07.jsx file.

// Delima: How can we modify the state={} in counters07 component, from here (from counter14 component)
// Solution: Raising an event, called "onDelete", created here (in downstream component), calling the
// (upstream component)  => Raising event by downstream component  &&&& Handling the event by the upstream
// component

// handleDelete() should be done in the upstream component (here, counters07.jsx component) ==> The reference of the
// delete event handler will be passed by props to the upstream component

// We know that the upstream component, passed "onDelete={this.handleDelete}" through props. Thus, here
// we only need to use that reference in the onClick event.

import React, { Component } from "react";

class MyComp extends Component {
  constructor(props) {
    super(props);
    this.doHandleIncrementForPassingArgument = this.doHandleIncrementForPassingArgument.bind(
      this
    );
  }

  state = {
    value: this.props.value,
  };

  my_styles = {
    fontSize: 12,
    fontWeight: "bold",
  };

  handleInceremnt(product_id) {
    console.log(product_id);
    //this.props.value = 0;
    this.setState({ value: this.state.value + 1 });
  }

  doHandleIncrementForPassingArgument() {
    this.handleInceremnt({ id: 1 });
  }

  render() {
    let my_attr_classes = this.getBadgeClasses();
    console.log("props", this.props);

    return (
      <div>
        {this.props.children}
        <span style={this.my_styles} className={my_attr_classes}>
          {this.MyFunction()}
        </span>
        <button
          onClick={this.doHandleIncrementForPassingArgument}
          style={{ fontSize: 12 }}
          className="btn btn-secondary btn-sm"
        >
          MyButton
        </button>
        <button
          onClick={this.props.onDelete}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      </div>
    );
  }

  getBadgeClasses() {
    let my_attr_classes = " badge m-2 badge-";
    my_attr_classes += this.state.value === 0 ? "warning" : "primary";
    return my_attr_classes;
  }

  MyFunction() {
    const { value: count } = this.state;
    return count === 0 ? "Zero" : count;
  }
}

export default MyComp;
