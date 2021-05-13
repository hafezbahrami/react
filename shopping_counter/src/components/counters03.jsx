import React, { Component } from "react";
import Counter from "./counter03";

class Counters extends Component {
  render() {
    const { onResetClick, list_of_items, onDelete, onIncrement } = this.props;
    return (
      <React.Fragment>
        <button
          //onClick={this.props.onResetClick}
          onClick={onResetClick}
          className={this.resetButtonClassName()}
        >
          Reset
        </button>

        {/* {this.props.list_of_items.map((item) => ( */}
        {list_of_items.map((item) => (
          <Counter
            key={item.id}
            selected={true}
            item={item}
            // onDelete={this.props.onDelete}
            onDelete={onDelete}
            // onIncrement={this.props.onIncrement}
            onIncrement={onIncrement}
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
//      (I) Adding "NavBar" $ "APP" component to the whole chain of parent-child component.
//      (II) Apply the rule of "Single-Source-of-truth", after Having App as the most parent comp.
//      (III) We want the NavBar to show the total # of items
//      (IV) Stateless Functional Components

//****************************************************************************************
//      (I) Adding "NavBar" $ "APP" component to the whole chain of parent-child component.
//****************************************************************************************
// (1) "App" && "NavBar":
//     ** GOAL: Add a navigation bar at the top, where we want to show the toal # of counters
//       (a-1) The whole parent-chil component structure: [  App ==> Counters & navBar ==> Counter   ]
//             >> POINT: Now we want to change the architecture and put Nav bar at the same level as Counters.
//
//       (a-2) We need to change the index.js ==> Bring back the App component, and render the App component,
//             as the most-parent component in the index.js
//                "import App from './App';"  && "ReactDOM.render(<App />, document.getElementById("root"));
//
//       (a-3) Changes in "App.js" components:
//             ** Adding "NavBar" and "Counters" as two child-comp's to the "App"
//             ** "NavBar":
//                       >> Go to getbootstrap.com ==> under example there are many templates that we can use
//                       >> Let's pick the simple starter template ==> right click on the page of
//                          the template ==> go to "view_the_page_source" ==> under body we have "naviagtion bar"
//                          & next to navigation bar we have "main" element with the class "container"
//                       >> The template has a relative complex navigation bar ==> let's find a simpler nav bar:
//                          Go to home page ==> documentation ==> search for "nav bar" ==> a simple nav bar
//                          is found under "Brand" ==> copy the mark-up from there
//             ** Create Nav-Comp:
//                       >> Under components, create a new "navbar.jsx" file, with "imrc TAB TAB", and "cc TAB TAB"
//                          and copy the mark-up borrowed from getbootstrap website ==> rename the "class" to
//                          "className". ==> No need for state={..} in the navigation navbar.jsx.
//                                          import React, { Component } from "react";
//                                          class NavBar extends Component {
//                                            state = {};
//                                            render() {
//                                              return (
//                                                <nav class="navbar navbar-light bg-light">
//                                                  <a class="navbar-brand" href="/#">
//                                                    Navbar
//                                                  </a>
//                                                </nav>
//                                              );
//                                            }
//                                          }
//
//       (a-4) In App.js, add "NavBar" and "Counters" components:
//            ** Import the navBar and the Counters in the App.js, inside an overall <div> elemnt
//            ** Add the Counters element inside the <main/> element
//                            class App extends Component {
//                              state = {};
//                              render() {
//                                return (
//                                  <div>
//                                    <NavBar />
//                                    <main>
//                                      <Counters />
//                                    </main>
//                                  </div>
//                                );
//                              }
//                            }
//
//       (a-4) Single-Source of truth:
//             ** Things needs to be done to have the "Single-Source-of-truth" rule:
//                >> Now, our application has 3 layers of parent-child-child [  App ==> Counters & navBar ==> Counter   ]
//                >> we need to lift-up all the state={..} from all child-comp's to the most senior parent-comp: "APP"
//                   Both "Counters" and "NavBar" comp's should recieve the data/info from "App" component via props.

//****************************************************************************************
//      (II) Apply the rule of "Single-Source-of-truth", after Having App as the most parent comp.
//****************************************************************************************
// (2) Steps for "Single-Source of truth":
//    ** RULE: In the child-comp, we should not keep the state={..}. All the data should flow from parent-comp to
//             the child-comp through ptops.
//    (2-a) In the counters, remove state={..}, as well as the methods that modify or mutate
//          the state, such as all the handle methods, ... ==> Move all of these to the parent component (App component)
//          >> In the counters, remove all the reference "this.handleReset" or other handlers.
//    (2-b) Implement the event-handlers in the most-parent component, App.js: onIncrement, onDelete,
//          >> In App.js, where in the render() we have <Counter/>, we will give all the reuired props,
//             such as: onReset={this....}, on onDelete={this....}, onIncrement={this..}
//          >> Consequently, in the Counters.jsx, we should change all the onReset={this....},
//             on onDelete={this....},onIncrement={this..}, to get it from props. In other words, from its parent
//             component:
//             onReset={this.props.onReset}, on onDelete={this.props.onDelete},onIncrement={this.props.onINcrement}
//    (2-c) Since we do not have state={..} in the Counters.jsx anymore, we need to change "this.state.list_of_items"
//          to have access via props from parent component "this.state.list_of_items"

//    (2-d) Counters component is entirely acontrolled component (by its parent), since:
//          >> It does not have any state ==> It receives data from "list_of_items={this.state.list_of_items}"
//             and methods to modify the data. This is Render method in the "App":
//                          render() {
//                            return (
//                              <div>
//                                <NavBar />
//                                <main>
//                                  <Counters
//                                    list_of_items={this.state.list_of_items}
//                                    onDelete={this.delEventhandler}
//                                    onIncrement={this.incrementEventhandler}
//                                    onResetClick={this.resetEventHandler}
//                                  />
//                                </main>
//                              </div>
//                            );
//                          }

//****************************************************************************************
//      (III) We want the NavBar to show the total # of items
//****************************************************************************************
// (3) Display total number in the navBar
// Approach:
//         (3-a) Since, we defined the NavBar in navbar.jsx, we need to pass the information from App.js, as
//               the parent-comp, to the NavBar comp, as the child-com. This happens through props.
//               Similar thing we did to pass the info/dat into Counters (as the other child-comp).
//         (3-b) For simplicity, instead of passing the whole counters to NavBar, we just pass total number:
//             >> totalCounters={this.state.myCounters.lenngth} &&
//                totalCountersGreatThan0={this.state.myCounters.filter(c => c.value > 0).length}
//         (3-c) In the NavBar, as a span, from classname="badge badge-pill badge-secondary"
//                <span classname="badge badge-pill badge-secondary"></span>

//                          render() {
//                            console.log("Rendering NavBar, total # is: ", this.props.onTotalVal);
//                            return (
//                              <nav className="navbar navbar-light bg-light">
//                                <a className="navbar-brand" href="/#">
//                                  Navbar
//                                  <span className="badge badge-pill badge-secondary">
//                                    {this.props.onTotalVal}
//                                  </span>
//                                </a>
//                              </nav>
//                            );
//                          }

//****************************************************************************************
//      (IV) Stateless Functional Components
//****************************************************************************************
//  (4): Functional NavBar comp:
//         ** Instead of using a class (like the class we used for navBar component), we want to use a function
//         ** In the object NavBar component, we only have a render() method, without any event handler, no
//             helper-method to calculate values , no state={..} and getting all data via props
// Approach:
//         (4-a) Define a constant called NavBar
//                ==> const NavBar = () = { return(); },
//               in which we return a react element. Basically the whole return statement, previously defined in the class, we move it inside this
//               newly defined function
//               POINT: Similar to create a class component where we used "cc with 2 tabs", for a stateless function
//                      element, we use "sfc 2 Tabs"
//         (4-b) In a functional comp, we need to pass the props inside the argument, so that we are able to
//               use it inside the function. Then, unlike the class component wehere we used to use "this.prop",
//               here in functional comp, we directly use "props" w/o using "this".
//         (4-c) "Destructuring Argument" in Functional Comp:
//               >> If in a funtional code, we want to use props alot, we can destructure it to simply the use
//                  of props.
//               >> In the navBar functional component, we use props.onTotalVal, by passing the props
//                  as argument to the funtion
//               >> We can destructure this, and pass ({onTotalVal}) as the argument to the function
//                  directly ans use it
//                                  const NavBar = ({ onTotalVal }) => {
//                                    console.log("Funtional navBar comp is created! ", onTotalVal);
//                                    return <h1> Hellllo</h1>;
//                                  };

//****************************************************************************************
//      (IV) Destructing in a class Components
//****************************************************************************************
//  (5): Destructing:
//          (5-a) Destructing in a stateless Functional comp is explained above, in section (4-c)
//          (5-b) The same can be done for class comp:
//                >> In the Counters comp, right in the render(), we define a constant as:
//                      const { onReset, list_of_myCounters, onDelete, onIncrement } = this.props;
//                >> Search for all "this.props...", and remove the "this.props" part.
