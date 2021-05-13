// Rendering a list: How to render a list of items
import React, { Component } from "react";

class MyComp extends Component {
  state = {
    count: 1,
    street: "Billerica",
    mytags1: ["tag1", "tag2", "tag3", "tag4"],
    mytags2: ["Hafez1", "Hafez1", "Hafez1", "Hafez1"]
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
        {/* render a list ... mytag2 list is rendered in a way that each item in the list has its own key. This is what Reacts likes */}
        <ul>
          {this.state.mytags1.map(item_in_mytag1 => (
            <li> {item_in_mytag1} </li>
          ))}
        </ul>

        {/* Using key={}  to identify each item in the list*/}
        <ul>
          {" "}
          {this.state.mytags2.map(item_in_mytag2 => (
            <li key={item_in_mytag2}> {item_in_mytag2} </li>
          ))}{" "}
        </ul>
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
