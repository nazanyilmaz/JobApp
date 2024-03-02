import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h2>JobApp</h2>
      <nav>
        <NavLink to={"/"}>Job List</NavLink>
        <NavLink to={"/add"}>Add Job</NavLink>
      </nav>
    </header>
  );
};

export default Header;
