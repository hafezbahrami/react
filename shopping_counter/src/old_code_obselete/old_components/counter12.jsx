/// someminor changes:
// count ==> rename it to value ==> to do so, put the curosor in count, and then press "F2"
// Recieving Children prop:
// in Counters04, we pass "children" property to each "MyComp" element. Here, we want to see if we received it.
// it is accessible through ==> "this.props.children"
// We should see the passed-children to this component, by the Counters04 ==> in the browser we should
// be able to see the "Title"

import React, { Component } from "react";

class MyComp extends Component {
  constructor(props) {
    super(props);
    this.doHandleIncrementForPassingArgument = this.doHandleIncrementForPassingArgument.bind(
      this
    );
  }

  state = {
    value: this.props.value
  };

  my_styles = {
    fontSize: 12,
    fontWeight: "bold"
  };

  handleInceremnt(product_id) {
    console.log(product_id);
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
