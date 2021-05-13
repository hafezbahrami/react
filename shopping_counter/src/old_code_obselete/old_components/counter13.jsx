// Props vs State
// "props" includes data that we give to our component, while state constains data that is
// local or private to that component. Other Component cannot access that state, and is completely
// private to that component.

// Whatever we pass to a component within  <MyComp ??? ???? ???? > , these ??? counts as props in
// the receiver component

// We cannot access to the state of MyComp component, since the state is local and private to MyComp class

// "props" are only read-only, and cannot be changed ==> look at the example added in "handleIncrement" method
// as ===>  //this.props.value = 0;

// If we need to change the value in the "props", we must put the props inside the state={}

import React, { Component } from "react";

class MyComp extends Component {
  constructor(props) {
    super(props);
    this.doHandleIncrementForPassingArgument = this.doHandleIncrementForPassingArgument.bind(
      this
    );
  }

  state = {
    value: this.props.val,
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
