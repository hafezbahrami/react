/// Stateless Functional Components
//  Instead of using a class (like the class we used for navBar component), we want to use a function
//
// Approach:
//         (1) in the NavBar component, we only have a render() method, without any event handler, no
//             helper-method to calculate values , no state={..} and getting all data via props
//         (2) Define a constant called NavBar ==> const NavBar = () ={}, in which we return a react element,
//             ** Basically the whole return statement, previously defined in the class, we move it inside this
//                newly defined function
//         (3) Similar to create a class component where we used "cc with 2 tabs", for a stateless function
//             element, we use "sfc 2 Tabs"
//         (4) In functional component, we need to pass the prps inside the argument, so that we are able to
//             use it inside the function. Then, unlike the class component wehere we used to use "this.prop", here
//             in functional component, we directly use "props" w/o using "this".

/// Destructuring Argument

// Goal: If in a funtional code, we want to use props alot, we can destructure it to simply the use of props.
// Approach:
// Destructuring in Functional Component:
//          (1) In the navBar functional component, we use props.totalCountersGreatThan0, by passing the props
//              as argument to the funtion
//          (2) We can destructure this, and pass ({totalCountersGreatThan0}) as the argument to the function
//              directly ans use it

import React from "react";
//const NavBar = props => {
const NavBar = ({ totalCountersGreatThan0 }) => {
  console.log("NavBar (a child-comp) - Rendered!");
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="/#">
        Navbar{" "}
        <span className="badge badge-pill badge-secondary">
          {/* {props.totalCountersGreatThan0} */}
          {totalCountersGreatThan0}
        </span>
      </a>
    </nav>
  );
};
export default NavBar;

// // iirc TabTab
// import React, { Component } from "react";
// // In the render we simply copy the mark-up we borrowed from bootstrap

//// cc Tab
// class NabBar extends Component {
//   state = {};
//   render() {
//     return (
//       <nav className="navbar navbar-light bg-light">
//         <a className="navbar-brand" href="/#">
//           Navbar{" "}
//           <span className="badge badge-pill badge-secondary">
//             {this.props.totalCountersGreatThan0}
//           </span>
//         </a>
//       </nav>
//     );
//   }
// }

// export default NabBar;
