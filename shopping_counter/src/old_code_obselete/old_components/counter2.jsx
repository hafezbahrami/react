// Adding style and attribute to a property
import React, { Component } from "react";

class MyComponent extends Component {
  state = {
    count: 0,
    street: "Billerica"
    // imageURL: "https://picsum.photos/200"
  };

  my_styles = {
    fontSize: 10,
    fontWeight: "bold"
  };

  render() {
    return (
      <div>
        {/* <img src={this.state.imageURL} alt="" /> */}
        {/* Name of attibute in JSX is className, and using a couple of bootstrap classes in the attribute: badge, badge-primary, m-2 */}
        {/* Also, we want to apply style to specific element */}
        <span style={this.my_styles} className="badge badge-primary m-2">
          {" "}
          {this.MyFunction()}
        </span>
        {/* Applying some bootstrap classes through attributes [className] into Button object */}
        <button style={{ fontSize: 40 }} className="btn btn-secondary btn-sm">
          {" "}
          MyButton
        </button>
      </div>
    );
  }

  MyFunction() {
    const { count } = this.state;
    return count === 0 ? "Zero" : count;
  }
}

export default MyComponent;
