import React, { Component } from "react";
import Counter from "./counter02";

class Counters extends Component {
  state = {
    list_of_items: [
      { id: 0, val: 0 },
      { id: 1, val: 1 },
      { id: 2, val: 2 },
      { id: 3, val: 3 },
    ],
  };

  render() {
    return (
      <React.Fragment>
        <button
          onClick={this.resetEventHandler}
          className={this.resetButtonClassName()}
        >
          Reset
        </button>

        {this.state.list_of_items.map((item) => (
          <Counter
            key={item.id}
            selected={true}
            item={item}
            onDelete={this.delEventhandler}
            onIncrement={this.incrementEventhandler}
          ></Counter>
        ))}
      </React.Fragment>
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

  resetButtonClassName() {
    return "btn btn-primary m-2";
  }
}
export default Counters;

// Single Source of Truth

// (0) A couple of POINTS:
//     POINT1: Cloning in JS:
//             ** There are 3 methods to clone an object in JS. One east method is using:
//                clonedObj = [...OrigObj]
//     POINT2: index of an elment of array:
//             ** const myArr=["Ali", "Naghi", "Hafez"]
//                myArr.indexOf("Naghi") = 1

// (1) Controlled Component:
//     ** A child component that does not have a local state:
//                       (a) It receives all the data via props from a parent component
//                       (b) And it raises event whenever the data needs to be changes
//                       (c) It is entirelly controlled by its parent

// (2) Events "BEST PRACTICE":
//     ** Move all Event-handler to parent-comp:
//     ** Move all Raising to child-comp:
//     ** Procedure:
//        (a) It seems we can do operation on the state={..} values/variables of the child-comp (enevt-hamdler of
//            the Increment button), when the event-handler is inside the child-comp.
//            If we want to move all ebent-handler to Parent-comp, we MUST get rid of state={..} in the child-comp
//            and set all values by the coming props to the child-comp.
//               >> POINT: we know, from previous notes, if the event handler is in the child-comp, in order to be
//                         able to change the values inside the child-comp state={..}, we must bind the "this" inside
//                         the constructor.
//
//        (b) State={..} in the parent-comp includes all the necessary info to be passed by props to the child-comp:
//                              state = {
//                                list_of_items: [
//                                  { id: 0, val: 0 },
//                                  { id: 1, val: 1 },
//                                  { id: 2, val: 2 },
//                                  { id: 3, val: 3 },
//                                ],
//                              };
//        (c) For convinience, we can pass every otem defined in the list in the parent-comp State={..} as props to
//            the child-comp. Look at the "item={item, below}":
//                              {this.state.list_of_items.map((item) => (
//                                <Counter
//                                  key={item.id}
//                                  selected={true}
//                                  item={item}
//                                  onDelete={this.delEventhandler}
//                                  onIncrement={this.incrementEventhandler}
//                                ></Counter>
//                              ))}
//        (d) For incrementEventhandler:
//            (d-1) Goal: Increase the value specified in the child-comp state={..}, which itself will increase the
//                        value specified in the <span> .... </span>
//            (d-2) The child-comp state will be filled by values of parent-comp state={..} of props sent to child-comp.
//            (d-3) Conclusion: WE NEED TO UPDATE THE VALUE IN THE PARENT_COMP state={....}
//            (d-4) Actual steps:
//                              $$ Clone the variable/array defined in the parent-comp state={...}
//                              $$ find the index of the specific array that the button got hit
//                              $$ Replace the comingItem into the Cloned variable/array, getting help from the
//                                 found index
//                              && Do the modification of that specific member of cloned variable/array ==> for our
//                                 case increment it it by 1.
//                              $$ use "setState({})" to update the whole parent-comp state={..} with
//                                 updated-cloned-variable.array

// (3) "Reset" Button:
//     ** Adda simple button, with an "onClick" button.
//     ** Following the best practices, the event will be handled in the parent-com, which is itself, here. Event is
//        raised and handled in the same file (parent-comp).
//                  render() {
//                    return (
//                      <React.Fragment>
//                        <button onClick={this.resetEventHandler} className={this.resetButtonClassName()}>   Reset </button>
//                        <Counter ????????> </Counter>
//                      </React.Fragment>
//                    );
//                  }
//
//     ** And ahndling the resetEvent in the same parent-comp:
//                  resetEventHandler = () => {
//                    const new_reset_list_of_items = this.state.list_of_items.map((item) => {
//                      item.val = 0;
//                      return item;
//                    });
//                    this.setState({ list_of_items: new_reset_list_of_items });
//                  };
//

// (3) "NavBar":
//     ** GOAL: Add a navigation bar at the top, where we want to show the toal # of counters
