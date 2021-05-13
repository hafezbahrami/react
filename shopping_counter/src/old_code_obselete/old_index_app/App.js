import React, { Component } from "react";
//import logo from './logo.svg';
import NavBar from "./components/navbar";
import "./App.css";
import MyComponents from "./components/counters27";

class App extends Component {
  state = {
    myCounters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 }
    ]
  };

  constructor(props) {
    super(props);
    console.log("App - Constructor!", this.props);
    //this.state = this.props.something;
  }

  componentDidMount() {
    console.log("App - Mounted!");
    // Ajax call
    //this.setState({ listOfMovies_from_a_server });
  }

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
    const myCounters = [...this.state.myCounters];
    const index = myCounters.indexOf(eachCounter);
    myCounters[index] = { ...eachCounter };
    myCounters[index].value++;
    this.setState({ myCounters });
  };

  render() {
    console.log("App - Rendered!");

    return (
      <div>
        <NavBar
          totalCounters={this.state.myCounters.lenngth}
          totalCountersGreatThan0={
            this.state.myCounters.filter(c => c.value > 0).length
          }
        />
        <main>
          <MyComponents
            list_of_myCounters={this.state.myCounters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDelete={this.handleDelete}
          />
        </main>
      </div>
    );
  }
}

export default App;
