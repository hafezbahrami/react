/// Lifecycle Hooks - Updating Phase

// Update Phase: This happens whenever the state={..} or props of a component changes
// Example: When we hit our "Increment" button
// Procedure:
//           (1) in App.js, we have various "handleEvents" funstions, where the updates happens
//               ** Let's focus on "handleIncrement" ==> Where we update the state={..} of App
//                  component using setState({..}).
//           (2) setState({..}) will schedule a call to the Render method of the component ==> which
//               means not only App will be rendered, but also all its children will also be rendered.
//               To see it in the Console:
//                 ** Clear the console in the browser, then click the "Increment" button
//                 ** As we see by clicking "Increment" button, the entire tree in virtual DOM gets
//                    rendered, but not the actual DOM. The React will compare the virtual DOM with
//                    the actual DOM, and will update the part that has been changed, only.
//           (3) back into our counter component, we add the "componentUpdate()" life-cycle, right
//               under the class:
//               ** This method gets called when we get new state={..} or new props for this component
//                              componentDidUpdate(prevProps, prevState) {
//                                              console.log("prevProps: ", prevProps);
//                                              console.log("prevState: ", prevState);
//                                          }
//               ** Now, clear the console in the browser, and hit the "Increment" button
//            (4) Optimization of the code:
//               ** Perhaps, we can use "componentUpdate()" life-cycle, to make a new data from a
//                  server, only when the new-props is different that the old-props of that component
//                              componentDidUpdate(prevProps, prevState) {
//                                              console.log("prevProps: ", prevProps);
//                                              console.log("prevState: ", prevState);
//                                              if (prevProps.eachCounter.value !== this.props.eachCounter.value) {
//                                                              //Ajax call to get the new data from the server
//                                                    }
//

import React, { Component } from "react";

class MyComp extends Component {
  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps: ", prevProps);
    console.log("prevState: ", prevState);
    if (prevProps.eachCounter.value !== this.props.eachCounter.value) {
      //Ajax call to get the new data from the server
    }
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
