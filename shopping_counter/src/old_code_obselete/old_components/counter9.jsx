/// Passing Event Argument
// in the button property, we have a handle to a function, but we cannot directly pass a number to the function through the handle
// We need to pass the function reference through the handle
// In the code below, the actual event handler is "handleInceremnt", but in button property we call the
// secondary event handler "doHandleIncrementForPassingArgument", through which we pass an id to the actual event handler
import React, { Component } from "react";

class MyComp extends Component {
  constructor() {
    super(); // because this enheritaces from Component class
    //this.handleInceremnt = this.handleInceremnt.bind(this); // this returns a handle to the function "handleInceremnt". Now, we can use "this" inside the handleInceremnt function.
    this.doHandleIncrementForPassingArgument = this.doHandleIncrementForPassingArgument.bind(
      this
    ); // this returns a handle to the function "handleInceremnt". Now, we can use "this" inside the handleInceremnt function.
  }

  state = {
    count: 1,
    street: "Billerica"
  };

  my_styles = {
    fontSize: 12,
    fontWeight: "bold"
  };
  // instead of constructor, we could directly use this:
  // handleInceremnt => () {
  //   console.log("Increment Clicked!", this);
  // }
  handleInceremnt(product_id) {
    console.log(product_id);
    this.setState({ count: this.state.count + 1 });
  }

  doHandleIncrementForPassingArgument() {
    this.handleInceremnt({ id: 1 });
  }

  // let's have a badge that is yello if zero, otherwise is a primary-badge, i.e. blue
  render() {
    let my_attr_classes = this.getBadgeClasses();

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
      </div>
    );
  }

  getBadgeClasses() {
    let my_attr_classes = " badge m-2 badge-";
    my_attr_classes += this.state.count === 0 ? "warning" : "primary";
    return my_attr_classes;
  }

  MyFunction() {
    const { count } = this.state;
    return count === 0 ? "Zero" : count;
  }
}

export default MyComp;
