/// Setting "count" in the state ={ } property to "this", so we can use this to see the "props" and its "value"
// We will pssing the "value" to this component ==> value is accessible by: this.props.value

import React, { Component } from "react";

class MyComp extends Component {
  constructor(props) {
    super(props); // because this enheritaces from Component class
    //this.handleInceremnt = this.handleInceremnt.bind(this); // this returns a handle to the function "handleInceremnt". Now, we can use "this" inside the handleInceremnt function.
    this.doHandleIncrementForPassingArgument = this.doHandleIncrementForPassingArgument.bind(
      this
    ); // this returns a handle to the function "handleInceremnt". Now, we can use "this" inside the handleInceremnt function.
  }

  state = {
    count: this.props.value
  };

  my_styles = {
    fontSize: 12,
    fontWeight: "bold"
  };

  handleInceremnt(product_id) {
    console.log(product_id);
    this.setState({ count: this.state.count + 1 });
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
