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
// Changinf the vaue of a button by hitting it, is all happening in local, and in local
// state can change... but the Reset button is not local and cannot change the state={..} in
// another component

// Key point: Look at the "component" in the debug mode, in the browser, look at the value
//            of each component at the state section, also in the props section look at the
//            value noted in the eachCounter passed by the parent component. You will realize
//            that state is local and cannot be changed by the parent component

import React, { Component } from "react";

class MyComp extends Component {
  constructor(props) {
    super(props);
    this.doHandleIncrementForPassingArgument = this.doHandleIncrementForPassingArgument.bind(
      this
    );
  }

  state = {
    value: this.props.eachCounter.value
  };

  my_styles = {
    fontSize: 12,
    fontWeight: "bold"
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
    my_attr_classes += this.state.value === 0 ? "warning" : "primary";
    return my_attr_classes;
  }

  MyFunction() {
    const { value: count } = this.state;
    return count === 0 ? "Zero" : count;
  }
}

export default MyComp;
