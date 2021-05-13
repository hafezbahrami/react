import React, { Component } from "react";
import Counter from "./counter01";

class Counters extends Component {
  state = {
    list_id_val: [
      { id: 0, val: 0 },
      { id: 1, val: 1 },
      { id: 2, val: 2 },
      { id: 3, val: 3 },
    ],
  };

  render() {
    return (
      <React.Fragment>
        {this.state.list_id_val.map((item, idx) => (
          <Counter
            key={idx}
            val={item.val}
            id={item.id}
            onDelete={this.delEventhandler}
            onIncrement={this.incrementEventhandler}
          ></Counter>
        ))}
      </React.Fragment>
    );
  }
  delEventhandler = (passedID) => {
    console.log("Del event is handled in parent-comp! ");
    let newList = this.state.list_id_val.filter((item) => item.id !== passedID);
    this.setState({ list_id_val: newList });
  };
}
export default Counters;

// Parent-Child component relationship

// (1) multiple child-comp in one parent-comp:
//     ** Method 1:
//        It is simple and just, at its simplest version, copying the chil-comp multiple times in
//        the return section of the render in the parent-comp, and putting them all in one <React-Fragment>
//                render() {
//                  return (
//                    <React.Fragment>
//                      <Counter />
//                      <Counter />
//                      <Counter />
//                    </React.Fragment>
//                  );
//     ** Method 2:
//        Have a list with specific "id" and "value", so we go over each item of the list, and
//        call the child-comp and pass these "id" and "value" as props to the child-comp. The
//        list is defined inthe state={..} of the parent-comp.
//                    state = {
//                      list_id_val: [
//                        { id: 0, val: 0 },
//                        { id: 1, val: 1 },
//                        { id: 2, val: 2 },
//                        { id: 3, val: 3 },
//                      ],
//                    };
//
//                    render() {
//                      return (
//                        <React.Fragment>
//                          {this.state.list_id_val.map((item, idx) => (
//                            <Counter key={idx} val={item.val} id={item.id}></Counter>
//                          ))}
//                        </React.Fragment>
//                      );
//                    }
//                        >> POINT: All these "<Counter key={idx} val={item.val} id={item.id}>"
//                                  will be passed to the child-comp, Counter, as props. So,
//                                  we can see the props and can do "consol.log(this.ptops)" to
//                                  see the props in the child-comp. Right uder the render() in the
//                                  child-comp:
//                                  console.log("*** props-passed-to-child-comp *** ", this.props);

//
// (2) Data within React Components:
//     ** There are 2 source of data handling in React:
//        "Props" vs "State"
//        >> "props": includes data that we give/pass to the child-comp, by a parent-chil
//                    (a) Whatever we pass to a component within  <Counter ??? ???? ???? > ,
//                        these ??? counts as props into Counter as the child-comp or the the
//                        receivercomponent.
//                    (b) "props" are only read-only inside the chil-comp, and cannot be
//                        changed
//                    (c) Thus, props is passed to child-comp, save it into local state, then
//                        change the variables in the state by using "setState({..})"
//        >> "state": constains data that is local/private to that chil-comp. Other Components
//                    cannot access that state.
//                    (a) We cannot access to the state of a child-comp within the parent-comp
//                        , since the state is local and private to the child-comp

// (2) Data between React Components:
//     ** The parent-comp passes the "props"
//     ** in the child-comp, the state={..} variable is set by the passed props
//     ** constructor should get "props" as input, and should pass that into "super(props)" too.
//     ** in the event handle, using "setState({ ??? })", to set the value for the state={..}
//        variable using props
//     >> POINT:
//              when the state={..} is changed by using the method above, the change is internal
//              to the chiil-comp. The property will stay unchanged. If we "consol.log(this.props)"
//              we see this props will not change

// (3) Adding "Delete" button:
//     ** It is essentiall a button, similar to "Increment" button
//        >> We must make it in red-color
//     ** ISSUE:
//        >> For a delte button, the event handler must delete the button. In other words, delete
//           button is located in child-comp, however, the action (deleting the button) should
//           happen in the parent-comp ==> But, the flow of data is from parent-comp to child-comp
//           How, we can get the data/info from child-comp to parent-comp??
//        >> GENERAL RULE:
//                    $$ Event should be raised in child-comp, and should be handled in parent-comp
//                    $$ Eventhandle will be in the Parent-comp, and the address of the handler
//                       will be passed by "props" by parent-comp
//     ** Let's implement:
//        >> in the "child-comp":
//           In the render/return section, raise the event onClick, get the address of the
//           event handler from parent-comp
//                  return (
//                    <div>
//                      <button className={this.delButtonClassName()} onClick={this.props.onDelete} >
//                        Delete
//                      </button>
//                    </div>
//                  );
//        >> in the "parent-comp":
//                               (a) 1st add "onDelete" as the prop when rendering the child-comp
//                                   in which we pass the address of the eventHandler
//                                        [onDelete={this.delEventhandler}]
//                               (b) 2nd we implement the actual event handler, the address of which
//                                   was passed by the props to the child-comp.
//                                        delEventhandler() {
//                                          console.log("Del event is handled in parent-comp! ");
//                                        }
//                               (c) 3rd, we want to delete the corresponding button that got hit:
//                                   Create a new list, where the hitted component is not in the list.
//                                   This can be done by using "filter".
//                                   Then ,using "setState({..})", we can change the state in the
//                                   parent-comp... Since the value of state gets changed, the
//                                   whole components gets re-rendered.
//                  render() {
//                    return (
//                      <React.Fragment>
//                        {this.state.list_id_val.map((item, idx) => (
//                          <Counter
//                            key={idx}
//                            onDelete={this.delEventhandler}
//                          ></Counter>
//                        ))}
//                      </React.Fragment>
//                    );
//                  }
//
//                  delEventhandler = (idx) => {
//                    let newList = this.state.list_id_val.filter((item) => item.id !== idx);
//                    this.setState({ list_id_val: newList });
//                  };
//                  }
//     >> POINT:
//              (a) How to pass a value/id to an event-handler:
//                  using [   handlerName = (value) => {..}    ]
//              (b) Passing the key={id} in the render section is important, this "key" is the one
//                  that will be passed to the (value) part of event handler, and we can do
//                  operations on it.

// (4) Event / Event-Handling:
//     ** RULE 1:
//              Event is raised in child-comp, and will be handled in Parent-comp
//     ** RULE 2:
//              Handler is written as a function/method in parent-comp, and the address of the
//              method will be passed through the props into the child-comp.
//              Sometimes, we can also pass the value to be given as the argument of the event-
//              handler  ==> event below is raised with no passed argument
//                          <button onClick={this.props.onDelete} >
//                          Delete
//                          </button>
//     ** RULE 3:
//              If the handler method is written in the following format, it can take the "key"
//              value of the property as input to the handler method
//              [   handlerName = (value) => {..}    ]
//     ** RULE 4:
//              It is important to set the argument to the event-handler in the child-comp:
//              ==> event below is raised with passed argument
//                          onClick={() => this.props.onDelete(this.props.id)}
//                          Delete
//                          </button>
//     ** RULE 5:
//              We can change the variables in the state={..} of the parent-comp by using the
//              this.setState({.....})
//     ** RULE 6:
//              If the goal of the event is to change a value in the state={..} of chil-comp,
//              this will be difficult.
//              For this solution, we'd better to move up all the state={..} to the parent-comp
//              ==> This is called "SINGLE SOURCE OF TRUTH"
