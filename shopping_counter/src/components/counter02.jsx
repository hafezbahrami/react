import React, { Component } from "react";

class Counter extends Component {
  render() {
    console.log(
      "*** Rendered child-comp with id=",
      this.props.item.id,
      "val=",
      this.props.item.val
    );

    return (
      <div>
        <span style={this.myStyle} className={this.myClassNameFunc()}>
          {this.spanVal()}
        </span>
        <button onClick={() => this.props.onIncrement(this.props.item)}>
          Increment
        </button>
        <button
          className={this.delButtonClassName()}
          onClick={() => this.props.onDelete(this.props.item.id)}
        >
          Delete
        </button>
      </div>
    );
  }
  spanVal() {
    return this.props.item.val === 0 ? "zero" : this.props.item.val;
  }
  myStyle = {
    fontSize: 20,
    fontWeight: "bold",
  };
  myClassNameFunc() {
    let className = "badge m-2 badge-";
    className += this.props.item.val === 0 ? "warning" : "primary";
    return className;
  }

  delButtonClassName() {
    return "btn btn-danger m-2";
  }
}

export default Counter;
