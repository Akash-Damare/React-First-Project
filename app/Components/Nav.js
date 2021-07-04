import React from "react";
import { ThemeConsumer } from "../Context/Theme";
import { NavLink } from "react-router-dom";

const activeStyle = {
  color: "rgb(255,0,0)",
};

function Nav() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <div className="row space-between">
          <ul className="row nav">
            <li>
              <NavLink to="/" className="nav-link" activeStyle={activeStyle}>
                Battle
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/popular"
                className="nav-link"
                activeStyle={activeStyle}
              >
                Popular
              </NavLink>
            </li>
          </ul>
          <button
            style={{ fontSize: 30 }}
            className="btn-clear"
            onClick={toggleTheme}
          >
            {theme === "light" ? "🔦" : "💡"}
          </button>
        </div>
      )}
    </ThemeConsumer>
  );
}

export default Nav;
