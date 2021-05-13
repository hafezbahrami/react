// Multi-Components:
// When rendering the items in the list, we pass the key={item.id}, to each of components in the list, but what about
// the value??
// in the rendering and mapping, we add another attribute similar to key attribute ==> "value" attribute
// in each component, in its JSX file, we will add "consol.log('props', this.props);"  => every React compoonet has a property
// called props containing all the attributes apssing into the component
// Now, in the browser, we can "inspect" in the console
// in <MyComp key={item.id} value={item.value} selected={true} />, what will be passed as the props to MyComp
// object is "value={item.value} selected={true}", not the key={..}

import React, { Component } from "react";
import MyComp from "./counter11";

class MyComponents extends Component {
  state = {
    myCounters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
  };
  render() {
    return (
      <div>
        {this.state.myCounters.map((item) => (
          <MyComp key={item.id} value={item.value} selected={true} />
        ))}
      </div>
    );
  }
}

export default MyComponents;
