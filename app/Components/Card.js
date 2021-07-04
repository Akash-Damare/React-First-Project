import React from "react";
import propTypes from "prop-types";
import { ThemeConsumer } from "../Context/Theme";

function Card({ header, subheader, avatar, href, name, children }) {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className={`card bg-${theme}`}>
          <h3 className="center-text header-lg ">{header}</h3>
          <img src={avatar} className="avatar" alt={`avatar for ${name}`} />
          {subheader && <h2 className="center-text">{subheader}</h2>}
          <h2 className="center-text">
            <a href={href}>{name}</a>
          </h2>
          {children}
        </div>
      )}
    </ThemeConsumer>
  );
}

Card.propTypes = {
  header: propTypes.string.isRequired,
  subheader: propTypes.string,
  avatar: propTypes.string.isRequired,
  href: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  children: propTypes.object.isRequired,
};

export default Card;
