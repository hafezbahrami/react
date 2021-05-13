// Conditional rendering
import React, { Component } from "react";

class MyComponent extends Component {
  state = {
    count: 1,
    street: "Billerica"
  };

  render() {
    return (
      <React.Fragment>
        {" "}
        <span> {this.myCountFormatFunc()} </span>
        <button>MyButton</button>{" "}
      </React.Fragment>
    );
  }

  myCountFormatFunc() {
    //return this.state.count === 0 ? "Zero" : this.state.count;
    const { count } = this.state;
    return count === 0 ? "Zero" : count;
  }
}

export default MyComponent;
