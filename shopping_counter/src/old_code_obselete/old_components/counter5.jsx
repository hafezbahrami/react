// Conditional Rendering:
// If the array has at least one element we want to Render that array in the list, Otherwise
// display a message "there are no tags"
// jsx, unlike Angular, does not have if .. else if ...==> bc jsx is not a templating engine
// we can have rendertags() method, and define if / else if , in that method
// Using key={}  to identify each item in the list

import React, { Component } from "react";

class MyComp extends Component {
  state = {
    mytags2: []
  };

  renderTags() {
    if (this.state.mytags2.length === 0) return <p>there are no tags </p>;

    return (
      <ul>
        {/* Using key={}  to identify each item in the list*/}
        {this.state.mytags2.map(item_in_mytag2 => (
          <li key={item_in_mytag2}> {item_in_mytag2} </li>
        ))}
      </ul>
    );
  }

  // let's have a badge that is yello if zero, otherwise is a primary-badge, i.e. blue
  render() {
    return (
      <div>
        {this.state.mytags2.length === 0 &&
          "Theere are no tags (second method to apply condition inside render method)."}
        {this.renderTags()}
      </div>
    );
  }
}

export default MyComp;
