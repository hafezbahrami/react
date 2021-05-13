import React, { Component } from "react";
class NavBar extends Component {
  state = {};
  render() {
    console.log("Rendering NavBar, total # is: ", this.props.onTotalVal);
    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="/#">
          Navbar
          <span className="badge badge-pill badge-secondary">
            {this.props.onTotalVal}
          </span>
        </a>
      </nav>
    );
  }
}

export default NavBar;
