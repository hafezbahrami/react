import React, { Component } from "react";

class Counter extends Component {
  constructor() {
    console.log("Constructor-of-Counter-component-got-hit!");
    super();
    this.onClickEvHandler = this.onClickEvHandler.bind(this);
  }
  state = {
    count: 0,
    myList: ["Ali", "naghi", "Hassan"],
    myList2: ["Hafez"],
  };
  render() {
    return (
      <React.Fragment>
        <span style={this.myStyle} className={this.myClassNameFunc()}>
          {this.spanVal()}
        </span>
        <button onClick={this.onClickEvHandler}>Increment</button>
        <ul>
          {this.state.myList.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        {this.renderListWithLengthConditions()}
      </React.Fragment>
    );
  }

  spanVal() {
    return this.state.count === 0 ? "zero" : this.state.count;
  }
  myStyle = {
    fontSize: 20,
    fontWeight: "bold",
  };
  myClassNameFunc() {
    let className = "badge m-2 badge-";
    className += this.state.count === 0 ? "warning" : "primary";
    return className;
  }
  onClickEvHandler() {
    console.log(
      "Event - handled: pointing at the state of this class, using binding in the constructor: ",
      this.state
    );
    this.setState({ count: this.state.count++ });
  }
  renderListWithLengthConditions() {
    if (this.state.myList2.length === 0) return "Legth of the list is zero!";
    return (
      <ul>
        {this.state.myList2.map((item, idx) => (
          <li key={idx}> {item}</li>
        ))}
      </ul>
    );
  }
}

export default Counter;

// (1) Conditional rendering
//            spanVal() {
//                return this.state.count === 0 ? "zero" : this.state.count;
//            }
//     Additional example, is the conditinoal rendering we used for className property for the
//     <span> element/component.

// (2) props for a component:
//     ** props for a component will be right after name-of-component in the mark-up language:
//          <button  props1???   props2?? ... >               </button>
//     ** As an example, two props for <span> component/element are style & className:
//          <span style={this.myStyle} className={this.myClassNameFunc()}></span>

// (3) For data/info exchange within a class/object component, we can use:
//     ** semi-dictionary format: ==> such as state={...} or myStyle={...}
//     ** or Using function: myFunc(){ statement1;    statement2;  return(...);}
//        methods always gets () and have "return" statement.

// (4) rendering a list:
//     ** Soppose a list is defined in the state:
//        (a) we can state with a <ul> or <React.Fragment>, then inside this element, we can
//            have access to the list ==> {this.state.myList}
//        (b) To render each item in the list, we jusy need to map each item to a mock-up language:
//                <ul>
//                      {this.state.myList.map((item, idx) => (
//                                                  <li key={idx}>{item}</li>
//                                                         ))}
//                </ul>

// (5) if-else in React:
//     ** Unlike Angular, React does not have "else" part of the  if-else-if ...==> bc jsx is not a templating
//        engine.
//     ** A point specific to JS, regarding boolean &&:
//              >> in JS, unlike other languages, we can apply logical AND (&&) to/between
//                 non-boolean expressions
//              >> expriment: in the consol of the browser: type these conditions:
//                 true && false ===> false
//              >> true && "Hi"  ===> Hi  ====> in other words, in these situations, compiler reaches
//                 the 1st exrpression, if true, goes to the 2nd expression, here that is "Hi" which is
//                 non-boolean, ofr JS, if this is a not-empty string, it is counter as True. That is why,
//                 the overall expression is True, and returns the 2nd expression.
//              >> Example: in the browser consol: True && "Hi" && 1  ===> To JS, all three expressions
//                 are considered true. A non-zero number is considered True for JS compiler. ===> JS always
//                 returns the last True expression  ==> here it returns 1.
//     ** How to use only "if" to conditionally render a part:
//              >> use if condition to call an external function to do an extra rendering:
//                        renderListWithLengthConditions() {
//                            if (this.state.myList2.length === 0) return "Legth of the list is zero!";
//                            return (
//                                 [ DO RENDER THE LIST AS NORMAL  ]
//                            );
//                          }
//                        }

// (6) Events
//     ** There are some standard-built-in events with some common elements/components:
//        For instance for <button> there are: onClick, onDoubleClick, onKeyDown,...
//     ** Every raised event must be handled (means must be taken care of to what to do after
//        getting raised)
//     ** usually, events are raised in the child-comp and handled in parent-comp ==> But this
//        the end lesson
//     ** Raising and handling event in  the same (one) component:
//        (a) raise the event, then pass ONLY the "address" of the method that will handle the event:
//             <button> onClick={this.funToHandleEvent}
//             As seen, the eventhandlerMethod should only be passed by "address", means no () after
//             the method name
//        (b) Handle the event: In simplest case, is just a method to tell what to do after event
//            got raised:
//            (b-1) If "this" is not needed in the event handler: It is a simple function:
//                        funToHandleEvent(){
//                            console.log("Event-handled!");
//                        }
//            (b-2) If "this" is needed in the event handler:
//                        >> POINT: if an address of a method is passed (what we do in event handling),
//                                  then, this will not be accessible in the emthod.
//                        >> POINT: Then, a "constructor" is needed to bind the "this" to the event handler:
//
//                        constructor() {
//                            super();
//                            this.funToHandleEvent = this.funToHandleEvent.bind(this);
//                        }
//                        funToHandleEvent(){
//                            console.log("Event-handled!", this);
//                        }
//
//            (b-3) Operation on "this" in a method, that being called by paasing only the
//                  address (what we do in event handling):
//                        >> POINT: Two main ways to handle data in React are: "props" and "state". The
//                           difference will be explained later.
//                                  $$ "state" manages data within the component
//                                  $$ "props" will be passed to the component by parent-comp, similar to argument passed to a method
//                        >> POINT: Though access to "this" is possible by binding "this" to the
//                                  method-event-handler by binding in the constructor, but the
//                                  oprtation on this (such as operation of this.state={..} variables)
//                                  IS NOT POSSIBLE.
//                                    [this.state.count++;  ==> this is not possible as is]
//                        >> POINT: we can use "setState=({....})" to change the values
//                                  "setSatate({..})" will schedule an update to the components state={..}
//                                    [this.setState({ count: this.state.count + 1 });]
//                        >> POINT: we can use "setState=({....})" to change the values
//
//            (b-4) How to pass an argument to a event handler (NOT A VERY SMART METHOD here):
//                        >> POINT: in (b-3) we learned how to handle an event and have access to "this",
//                                  consequently have access to the this.state={..}
//                        >> POINT: How to pass a value to a event-handler, and maybe consequently pass that
//                                  value to the state={..}
//                        >> POINT: One method is 2-step event handling:
//
//                                    mainEventHandler() {
//                                        this.secondaryVirtualEventHandler({ id: 1 });
//                                    }
//
//                                    secondaryVirtualEventHandler(product_id) {
//                                        console.log(product_id);
//                                        this.setState({ count: this.state.count + 1 });
//                                    }
//                        >> POINT: The original method of passing value to an event handler will
//                                  be discussed in parent-comp/child-comp relationship
