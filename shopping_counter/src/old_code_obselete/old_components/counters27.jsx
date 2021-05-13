/// Lifecycle Hooks - unmounting Phase

// Procedure:
//          (1) Let's add "componentWilunmount" method to the counter
//              ** This method gets called just before a component is removed from DOM
//                            componentWillMount() {
//                              console.log("Counter - Unmount!");
//                            }
//          (2) Let's go back to the browser, consol, and hit the delete button:
//              **

import React, { Component } from "react";
import MyComp from "./counter27";

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
