/// Lifecycle Hooks - Mounting Phase

// Objective: our component goes through few "phases" during a life cycle
//            (1) 1st phase: Monting phase: when an instance of a component is created, and inserted into the DOM:
//                ** In the Mountin phase, we have 3 lifecycle hooks:
//                   (a) Constructor, (b) Render, (c) componentDidMount ==> React will call these methods in order
//            (2) 2nd phase: Update phase: when "state={..}" or "props" of a component gets changed
//                ** In the Update phase, we have 2 lifecycle hooks:
//                                    (a) Render, (b) componentDidMount, ==> When we give a new props or new state={..} of a component, these two methods get called in order
//            (3) 2nd phase: un-mountin phase: when we remove or delete a component (such as deleting a counter in our App)
//                ** In the Update phase, we have 1 lifecycle hooks:
//                                                (a) componentWillunmount

// Action/Example:
// (a) Mounting Phase:
//     (1) Let's add a constructor into App component:
//     ** When we adda constructor, we need to call the constructor of the parent class inside this constructor using "super()"
//                  constructor(){
//                            super();
//                            console.log("app's constructor got hit!")
//                    }
//     ** constructor will be hit only once, when the instance of the class gets created. Best opportunity to initialize the props.
//        One common usecase is to set the state={..} base on the props coming in from the outside
//           this.state = this.props.something
//     ** If we want to set the state in the constructor via props, then we need to pass the props to the constructor,
//        Also, pass it to the constructor of the base class ==> constructor(props) { super(props);  ....}
//     ** We can not call "setState" inside the constructor. I nfact "setState" is for time the component is completely
//        rendered in the DOMS

//     (2) componentDidMount:
//     ** This "component lifecycle hook" method gets called after our component is rendered into the DOM
//     ** Perfect place to get the data from a server (list of movies from a server) by using "setState({...})"

//     (3) render:
//     ** Let's adda simple consol.log() just to see when it gets hit

// Conclusion:
//           If we look at the browser, we see (1) 1st the component gets constructed
//                                             (2) 2nd the component is rendered: which basically it returns a
//                                                     react element representnig our virtual DOM. When a component
//                                                     is rendered, all its children is also rendered, recursively
//                                             (3) 3rd Mounting: React gets the virtual DOM created in step (2) and render it in actual browser DOM ==> Now, our component is mounted
//                                                 when the component is really mounted in actual browser DOM, it is a time we can actually get the data from server

// Lifecycle hook cannot be implemented into the "stateless functional component", only for a class component

import React, { Component } from "react";

class MyComp extends Component {
  my_styles = {
    fontSize: 12,
    fontWeight: "bold"
  };

  render() {
    console.log("Counter (a child-child-comp) - Rendered!");
    //console.log("props", this.props);

    let my_attr_classes = this.getBadgeClasses();

    return (
      <div>
        <span style={this.my_styles} className={my_attr_classes}>
          {this.MyFunction()}
        </span>
        <button
          onClick={() => this.props.onIncrement(this.props.eachCounter)}
          style={{ fontSize: 12 }}
          className="btn btn-secondary btn-sm"
        >
          MyButton
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.eachCounter.id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      </div>
    );
  }

  getBadgeClasses() {
    let my_attr_classes = " badge m-2 badge-";
    my_attr_classes +=
      this.props.eachCounter.value === 0 ? "warning" : "primary";
    return my_attr_classes;
  }

  MyFunction() {
    const { value: count } = this.props.eachCounter;
    return count === 0 ? "Zero" : count;
  }
}

export default MyComp;
