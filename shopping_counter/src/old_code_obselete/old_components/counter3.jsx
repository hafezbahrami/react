// Conditional attribute to a property

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

  // let's have a badge that is yello if zero, otherwise is a primary-badge, i.e. blue
  render() {
    let my_attr_classes = this.getBadgeClasses();

    return (
      <div>
        <span style={this.my_styles} className={my_attr_classes}>
          {this.MyFunction()}
        </span>
        <button style={{ fontSize: 12 }} className="btn btn-secondary btn-sm">
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
