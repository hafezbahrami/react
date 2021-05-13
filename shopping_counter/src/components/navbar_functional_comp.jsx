import React from "react";

const NavBar = ({ onTotalVal }) => {
  console.log("^^^ Rendered - NavBar (Mounted in React DOM)");
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="/#">
        Navbar
        <span className="badge badge-pill badge-secondary">{onTotalVal}</span>
      </a>
    </nav>
  );
};

export default NavBar;
