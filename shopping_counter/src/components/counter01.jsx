import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    console.log("Constructor-of-Counter-component-got-hit!");
    super(props);
    this.onClickEvHandler = this.onClickEvHandler.bind(this);
  }
  state = {
    value: this.props.val,
  };
  render() {
    console.log("*** props-passed-to-child-comp *** ", this.props);

    return (
      <div>
        <span style={this.myStyle} className={this.myClassNameFunc()}>
          {this.spanVal()}
        </span>
        <button onClick={this.onClickEvHandler}>Increment</button>
        <button
          className={this.delButtonClassName()}
          onClick={() => this.props.onDelete(this.props.id)}
        >
          Delete
        </button>
      </div>
    );
  }
  spanVal() {
    return this.state.value === 0 ? "zero" : this.state.value;
  }
  myStyle = {
    fontSize: 20,
    fontWeight: "bold",
  };
  myClassNameFunc() {
    let className = "badge m-2 badge-";
    className += this.state.value === 0 ? "warning" : "primary";
    return className;
  }
  onClickEvHandler() {
    console.log(
      "Event - handled: pointing at the state of this class, using binding in the constructor: ",
      this.state
    );
    this.setState({ value: this.state.value + 1 });
  }
  delButtonClassName() {
    return "btn btn-danger m-2";
  }
}

export default Counter;
