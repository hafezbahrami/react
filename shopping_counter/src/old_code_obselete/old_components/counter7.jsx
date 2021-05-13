/// handing Events + Binding Event Handlers:
// With no binding, we cannot, for example, use {this.stat.count} directly inside the Ecent-Handling-Method
// In general, "this" is not accessable inside the Handling-Event-Method
// "this" is different in JS than other languages ==> if "this" is used inside a methos of an
// object, this will point at that object ==> obj.method( this )  ==> this refers to obj
// We have to define a constructor for MyComp class
import React, { Component } from "react";

class MyComp extends Component {
  constructor() {
    super(); // because this enheritaces from Component class
    this.handleInceremnt = this.handleInceremnt.bind(this); // this returns a handle to the function "handleInceremnt". Now, we can use "this" inside the handleInceremnt function.
  }

  state = {
    count: 1,
    street: "Billerica"
  };

  my_styles = {
    fontSize: 12,
    fontWeight: "bold"
  };

  handleInceremnt() {
    console.log("Increment Clicked!", this);
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
