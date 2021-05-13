/// Updating the state
// Now we have access to "this" object (an instance of MyComp class) inside the envent
// handler, we can use it inside the state ={ }
// Do not modify the state directly:
// In react we cannot update the value of aproperty inside the state ==> here "this.state.count ++" will not work
// We should use a method, inheriting from our base class "Component": ==> we use "this.setState( )"
import React, { Component } from "react";

class MyComp extends Component {
  constructor() {
    super(); // because this enheritaces from Component class
    this.handleInceremnt = this.handleInceremnt.bind(this); // this returns a handle to the function "handleInceremnt". Now, we can use "this" inside the handleInceremnt function.
  }

  state = {
    count: 1,
    street: "Billerica",
  };

  my_styles = {
    fontSize: 12,
    fontWeight: "bold",
  };
  // instead of constructor, we could directly use this:
  // handleInceremnt => () {
  //   console.log("Increment Clicked!", this);
  // }
  handleInceremnt() {
    // this.state.count++;
    this.setState({ count: this.state.count + 1 });
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
