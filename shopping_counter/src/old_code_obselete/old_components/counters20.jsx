/// Multi-Component in Sync

// Goal: Add a navigation bar at the top, where we want to show the toal # of counters
//       (1) The whole structure so far in terms of components was like this: App ==> Counters ==> Counter
//       (2) Now we want to change the architecture and put Nav bar at the same level as COunters:
//                             App ==>  NavBar  +  Counters  ==> Counter
//       (3) We need to change the index.js ==> Bring back the App component, and render the App component, as the most-parent component in the index.js
//              "import App from './App';"  && "ReactDOM.render(<App />, document.getElementById("root"));
//       (4) Changes we need to make in the App.js components:
//             ** Go to getbootstrap.com ==> under example there are many templates that we can use
//             ** Let's pick the simple starter template ==> right click on the page of
//                the template ==> go to "view_the_page_source" ==> under body we have
//                "naviagtion bar" & next to navigation bar we have "main" element with
//                the class "container"
//             ** The template has a relative complex navigation abr ==> let's find a simpler nav bar:
//                Go to home page ==> documentation ==> search for "nav bar" ==> a simple nav bar
//                is found under "Brand" ==> copy the mark-up from there
//       (5) Navigation Component:
//            In our project, under components, create a new "navbar.jsx" file and copy the mark-up
//            we borrowed from getbootstrap website ==> rename the "class" to "className"
//            ** No need for state={..} in the navigation navbar.jsx
//       (6) In the App.js, we want to render the nav component there
//            ** Remove the "<div className="App">" in the App.js and replaced it with <NavBar> </NavBar>
//            ** Import the navBar and the Counters in the App.js
//            ** Add the Counters element inside the main element

import React, { Component } from "react";
import MyComp from "./counter20";

class MyComponents extends Component {
  state = {
    myCounters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 }
    ]
  };
  handleDelete = hittedCounterID => {
    const my_Counters = this.state.myCounters.filter(
      c => c.id !== hittedCounterID
    );
    this.setState({ myCounters: my_Counters });
  };

  handleReset = () => {
    const newSetsOfCounters = this.state.myCounters.map(item => {
      item.value = 0;
      return item;
    });
    this.setState({ myCounters: newSetsOfCounters });
  };
  handleIncrement = eachCounter => {
    //console.log(eachCounter);
    const myCounters = [...this.state.myCounters]; // clone the myCounters in the state={..} right here
    const index = myCounters.indexOf(eachCounter);
    myCounters[index] = { ...eachCounter }; // Here, we say, the myCounter that we just clone in the above line, the item[0] of it to be cloned with the received counter.
    myCounters[index].value++;
    console.log(this.state.myCounters[index]); // With 2 lines above I do not expect the "myCounter in the state={..}" to be changed
    this.setState({ myCounters });
  };

  render() {
    return (
      <div>
        <button
          className="btn btn-primary btn-sm m-2"
          onClick={this.handleReset}
        >
          {" "}
          Reset{" "}
        </button>

        {this.state.myCounters.map(eachCounter => (
          <MyComp
            key={eachCounter.id}
            selected={true}
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
            eachCounter={eachCounter}
          ></MyComp>
        ))}
      </div>
    );
  }
}

export default MyComponents;
