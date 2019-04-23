import React from "react";
import { NavLink } from "react-router-dom";
import "./MainNav.css";
const navbar = porps => {
  return (
    <header className="head">
      <div className="logo">
        <h1> Blink </h1>
      </div>
      <nav className="navig">
        <ul>
          <li>
            <NavLink to="/cours"> Courses </NavLink>
          </li>
          <li>
            <NavLink to="/auth"> Auth </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default navbar;
