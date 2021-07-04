import React from "react";
import propTypes from "prop-types";

export default class Hover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
    };
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  handleMouseOver() {
    this.setState({
      hovering: true,
    });
  }

  handleMouseLeave() {
    this.setState({
      hovering: false,
    });
  }
  render() {
    return (
      <div
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseLeave}
      >
        {this.props.children(this.state.hovering)}
      </div>
    );
  }
}

Hover.propTypes = {
  children: propTypes.func.isRequired,
};
