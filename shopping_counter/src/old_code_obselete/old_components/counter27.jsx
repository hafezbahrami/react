/// Lifecycle Hooks - unmounting Phase

import React, { Component } from "react";

class MyComp extends Component {
  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps: ", prevProps);
    console.log("prevState: ", prevState);
    if (prevProps.eachCounter.value !== this.props.eachCounter.value) {
      //Ajax call to get the new data from the server
    }
  }

  componentWillUnmount() {
    console.log("Counter - Unmount!");
  }

  my_styles = {
    fontSize: 12,
    fontWeight: "bold"
  };

  render() {
    console.log("Counter (a child-child-comp) - Rendered!");

    let my_attr_classes = this.getBadgeClasses();

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
