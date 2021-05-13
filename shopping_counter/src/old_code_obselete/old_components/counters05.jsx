// Dynamic react children
// We are passing the id #of each MyComp to be shown as a children element for each component
// we should remember we already rendered " {this.props.children} " in the <div> part of render in the counter12.jsx

// Alternative solution: passing the id directy:
// <MyComp key={item.id} value={item.value} selected={true} id={item.id}> ==> But this solution, does not
// count the "id" as the children of property, but it is part of props
// so we could render <h4> {this.props.id} </h4> in the render part of counter12.jsx

// Also add the "React Developer Tools" for google Chrome , and React App Debugging

// Cool Debugging Tip:
// In brwoser, in the "Elements", try to go to one of <button> </button> until you see the $0 sign in front
// of it. This means, now you can go to "Console" Tab, and type ==> $0.click( ) ==> This will perform one click()
// as if you fire the onClick() event, and the number will increase one number

import React, { Component } from "react";
import MyComp from "./counter12";

class MyComponents extends Component {
  state = {
    myCounters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 }
    ]
  };
  render() {
    return (
      <div>
        {this.state.myCounters.map(item => (
          <MyComp key={item.id} value={item.value} selected={true} id={item.id}>
            {/* <h4>MyPooooorComp #{item.id}</h4> */}
          </MyComp>
        ))}
      </div>
    );
  }
}

export default MyComponents;
