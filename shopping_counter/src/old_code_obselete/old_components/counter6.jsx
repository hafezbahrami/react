/// handling Events:
// All react elemnts have properties that are based on "Standard DOM events"
// For instance, for "Button" elements, we have standard events such as "onClick", "onDoubleClick", "onKeyDown", ...
// We usually define a method to handle the event --> Then, we will only pass the address of the method
// inside the event, we will not call the method (in other words we will not use ()    )

import React, { Component } from "react";

class MyComp extends Component {
  state = {
    count: 1,
    street: "Billerica"
  };

  my_styles = {
    fontSize: 12,
    fontWeight: "bold"
  };

  handleInceremnt() {
    console.log("Increment Clicked!");
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
          onClick={this.handleInceremnt}
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
