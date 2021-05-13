import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
//import NavBar from "./components/navbar";
import NavBar from "./components/navbar_functional_comp";
import Counters from "./components/counters04";

class App extends Component {
  constructor(props) {
    super(props);
    console.log("* App Obj - Constructed! ", this.props);
  }
  componentDidMount() {
    console.log("App - Got Mounted on Browser DOM!");
  }
  componentDidUpdate() {
    console.log("App - Got Updated!");
  }
  componentWillUnmount() {
    console.log("App - Got Unmounted!");
  }

  state = {
    list_of_items: [
      { id: 0, val: 0 },
      { id: 1, val: 1 },
      { id: 2, val: 2 },
      { id: 3, val: 3 },
    ],
  };

  render() {
    console.log("^^^ Rendered - App (Mounted on React DOM)!");
    return (
      <div>
        <NavBar onTotalVal={this.totalVal()} />
        <main>
          <Counters
            list_of_items={this.state.list_of_items}
            onDelete={this.delEventhandler}
            onIncrement={this.incrementEventhandler}
            onResetClick={this.resetEventHandler}
          />
        </main>
      </div>
    );
  }

  delEventhandler = (passedID) => {
    console.log("Del event is handled in parent-comp! ");
    const newList = this.state.list_of_items.filter(
      (item) => item.id !== passedID
    );
    this.setState({ list_of_items: newList });
  };

  incrementEventhandler = (item) => {
    const cloned_list_of_items = [...this.state.list_of_items];
    const idx_item = cloned_list_of_items.indexOf(item);
    cloned_list_of_items[idx_item] = { ...item };
    cloned_list_of_items[idx_item].val++;
    this.setState({ list_of_items: cloned_list_of_items });
  };

  resetEventHandler = () => {
    const new_reset_list_of_items = this.state.list_of_items.map((item) => {
      item.val = 0;
      return item;
    });
    this.setState({ list_of_items: new_reset_list_of_items });
  };

  totalVal() {
    const totalVal = this.state.list_of_items.filter((c) => c.val > 0);
    return totalVal.length;
  }
}

export default App;
