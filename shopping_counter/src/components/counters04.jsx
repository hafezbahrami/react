import React, { Component } from "react";
import Counter from "./counter04";

class Counters extends Component {
  constructor(props) {
    super(props);
    console.log("* Counters Obj - Constructed!");
  }
  componentDidMount() {
    console.log("Counters - Got Mounted on Browser DOM!");
  }
  componentDidUpdate() {
    console.log("Counters - Got Updated!");
  }
  componentWillUnmount() {
    console.log("Counters - Got Unmounted!");
  }
  render() {
    console.log("^^^ Rendered - Child-Comp (Counters) (mounted in React DOM)!");
    return (
      <React.Fragment>
        <button
          onClick={this.props.onResetClick}
          className={this.resetButtonClassName()}
        >
          Reset
        </button>

        {this.props.list_of_items.map((item) => (
          <Counter
            key={item.id}
            selected={true}
            item={item}
            onDelete={this.props.onDelete}
            onIncrement={this.props.onIncrement}
          ></Counter>
        ))}
      </React.Fragment>
    );
  }

  resetButtonClassName() {
    return "btn btn-primary m-2";
  }
}
export default Counters;

// GOAL:
//      (I)   LifeCycle Hooks - Concept
//      (II)  Mounting phase
//      (III) Updating phase
//      (IV)  Un-Mounting phase

//****************************************************************************************
//      (I)   LifeCycle Hooks - Concept
//****************************************************************************************
//  (1) GOAL: Our components will go through few "phases" during a life cycle
//            (1-a) 1st, Monting phase:
//                   >> when an instance of a component is created, and inserted into the React DOM (not the actual DOM):
//                   >> In the Mountin phase, we have 3 lifecycle hooks:
//                     (a) Constructor, (b) Render, (c) componentDidMount ==> React will call these methods in-order
//            (1-b) 2nd, Update phase:
//                   >> when "state={..}" or "props" of a component gets changed
//                   >> In the Update phase, we have 2 lifecycle hooks:
//                                      (a) Render, (b) componentDidMount, ==> When we give a new props or new
//                                                                             state={..} of a component, these
//                                                                             two methods get called in order
//            (1-c) 3rd, Un-mountin:
//                   >> When we remove or delete a component (such as deleting a counter in our App)
//                   >> In the Update phase, we have 1 lifecycle hooks:
//                                                (a) componentWillunmount
//            (1-d) Lifecycle hook cannot be implemented into the "stateless functional component", only for a
//                  class component

//****************************************************************************************
//      (II)  Mounting phase
//****************************************************************************************
// (2) Mounting Phase, through an example:
//            (2-a) Constructor:
//                  >> Adding a constructor into App comp:
//                  >> When we adda constructor, we need to call the constructor of the parent class inside this
//                     constructor using "super()":
//                          constructor(props){
//                                    super(props);
//                                    console.log("app's constructor got hit!", this.props)
//                            }
//                  >> Constructor will be hit only once, when the instance of the class gets created. Best
//                     opportunity to initialize the props.
//                  >> One common usecase is to set the state={..} base on the props coming in from the outside
//                       this.state = this.props.something
//                  >> If we want to set the state in the constructor via props, then we need to pass the props
//                     to the constructor. Also, pass it to the constructor of the base class ==> constructor(props) { super(props);  ....}
//                  >> setState & constructor:
//                  >> We can not call "setState" inside the constructor. I nfact "setState" is for time the
//                     component is completely rendered in the DOM.
//            (2-b) Render:
//                  >> Let's adda simple consol.log() just to see when it gets hit
//            (2-c) componentDidMount:
//                  >> This "component lifecycle hook" method gets called after our component is rendered into
//                     the React DOM. Basically, at this step, it will be mounted in the actual, browser, DOM.
//                  >> Perfect place to get the data from a server (list of movies from a server) by using "setState({...})"
//                                componentDidMount() {
//                                  console.log("App - Got Mounted on Browser DOM!");
//                                }

//            (2-d) Conclusion:
//                  >> If we look at the browser, we see:
//                                   ($$) 1st the component gets constructed
//                                   ($$) 2nd the component is rendered: which basically it returns a
//                                        react element representnig our virtual DOM. When a component
//                                        is rendered, all its children is also rendered, recursively
//                                   ($$) 3rd Mounting: React gets the virtual DOM created in step (2) and
//                                        render it in actual browser DOM ==> Now, our component is mounted
//                                        when the component is really mounted in actual browser DOM, it is
//                                        a time we can actually get the data from server

//****************************************************************************************
//      (III)  Updating phase
//****************************************************************************************
// (3) Update Phase: This happens whenever the state={..} or "props" of a component changes
//     Example: When we hit our "Increment" button
//     Procedure:
//           (3-a) in App.js, we have various "handleEvents" funstions, where the updates happens
//                 >> Let's focus on "handleIncrement" ==> Where we update the state={..} of App
//                    component using setState({..}).
//                 >> setState({..}) will schedule a call to the Render method of the component ==> which
//                    means not only App will be rendered, but also all its children will also be rendered.
//                    To see it in the Console:
//                        $$ Clear the console in the browser, then click the "Increment" button
//                        $$ As we see by clicking "Increment" button, the entire tree in virtual DOM gets
//                           rendered, but not the actual DOM. The React will compare the virtual DOM with
//                           the actual DOM, and will update the part that has been changed, only.
//           (3-b) componentUpdate():
//                 >> Back into our counter component, we add the "componentUpdate()" life-cycle, right
//                    under the class:
//                 >> This method gets called when we get new state={..} or new "props" for this component
//                              componentDidUpdate(prevProps, prevState) {
//                                              console.log("prevProps: ", prevProps);
//                                              console.log("prevState: ", prevState);
//                                          }
//               ** Now, clear the console in the browser, and hit the "Increment" button
//            (4) Optimization of the code:
//               ** Perhaps, we can use "componentDidUpdate()" life-cycle, to make a new data from a
//                  server, only when the new-props is different that the old-props of that component
//                              componentDidUpdate(prevProps, prevState) {
//                                              console.log("prevProps: ", prevProps);
//                                              console.log("prevState: ", prevState);
//                                              if (prevProps.eachCounter.value !== this.props.eachCounter.value) {
//                                                              //Ajax call to get the new data from the server
//                                                    }
//                                          }

//****************************************************************************************
//      (IV)  Updating phase
//****************************************************************************************
// (4) Un-Mounting phase:
//          (4-a) Let's add "componentWilunmount" method to the counter
//                 >> This method gets called just before a component is removed from DOM
//                            componentWillMount() {
//                              console.log("Counter - Unmount!");
//                            }
//          (4-b) Let's go back to the browser, consol, and hit the delete button:
//
