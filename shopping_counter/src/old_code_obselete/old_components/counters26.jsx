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
//                                          }

import React, { Component } from "react";
import MyComp from "./counter26";

class MyComponents extends Component {
  render() {
    console.log("Counters (a chaild-com) - Rendered ");
    const { onReset, list_of_myCounters, onDelete, onIncrement } = this.props;
    return (
      <div>
        <button className="btn btn-primary btn-sm m-2" onClick={onReset}>
          {" "}
          Reset{" "}
        </button>

        {list_of_myCounters.map(eachCounter => (
          <MyComp
            key={eachCounter.id}
            selected={true}
            onDelete={onDelete}
            onIncrement={onIncrement}
            eachCounter={eachCounter}
          ></MyComp>
        ))}
      </div>
    );
  }
}

export default MyComponents;
