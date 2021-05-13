/// Now we receive the entire counter object from parent component (counter09.jsx)
// all previous props.id or props.value  ==> props.eachCounterObject.id or props.eachCounterObject.value
import React, { Component } from "react";

class MyComp extends Component {
  constructor(props) {
    super(props);
    this.doHandleIncrementForPassingArgument = this.doHandleIncrementForPassingArgument.bind(
      this
    );
  }

  state = {
    value: this.props.eachCounter.value
  };

  my_styles = {
    fontSize: 12,
    fontWeight: "bold"
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
    my_attr_classes += this.state.value === 0 ? "warning" : "primary";
    return my_attr_classes;
  }

  MyFunction() {
    const { value: count } = this.state;
    return count === 0 ? "Zero" : count;
  }
}

export default MyComp;
