/// Display total number in the navBar
// Approach:
//         (1) in the App.js, for the MyComponents component, we pass "list_of_myCounters={this.state.myCounters}"
//            as a prop to the child component. Similarly, we can pass the prop, to the NavBar component.
//            Basically, MyComponents (counters) component and NavBar are at the same level, as two child component
//            for the App component as parent component.
//         (2) For simplicity, instead of passing the whole counters to NavBar, we just pass total number:
//            totalCounters={this.state.myCounters.lenngth} &&
//            totalCountersGreatThan0={this.state.myCounters.filter(c => c.value > 0).length}
//         (3) In the NavBar, as a span, from classname="badge badge-pill badge-secondary"
//             <span classname="badge badge-pill badge-secondary"></span>
//

import React, { Component } from "react";
import MyComp from "./counter22";

class MyComponents extends Component {
  render() {
    return (
      <div>
        <button
          className="btn btn-primary btn-sm m-2"
          //onClick={this.handleReset}
          onClick={this.props.onReset}
        >
          {" "}
          Reset{" "}
        </button>

        {this.props.list_of_myCounters.map(eachCounter => (
          <MyComp
            key={eachCounter.id}
            selected={true}
            onDelete={this.props.onDelete}
            onIncrement={this.props.onIncrement}
            eachCounter={eachCounter}
          ></MyComp>
        ))}
      </div>
    );
  }
}

export default MyComponents;
