import React, { Component } from "react";
import {
  FaUserFriends,
  FaFighterJet,
  FaTrophy,
  FaTimesCircle,
} from "react-icons/fa";
import propTypes from "prop-types";
import { ThemeConsumer } from "../Context/Theme";
import { Link } from "react-router-dom";

function Instructions() {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className="instruction-container">
          <h1 className="center-text header-lg">Instructions</h1>
          <ol className="container-sm grid center-text battle-instructions">
            <li>
              <h3 className="header-sm">Enter two Github users</h3>
              <FaUserFriends
                className={`bg-${theme}`}
                color="rgb(255,191,116)"
                size={140}
              />
            </li>
            <li>
              <h3 className="header-sm">Battle</h3>
              <FaFighterJet
                className={`bg-${theme}`}
                color="#727272"
                size={140}
              />
            </li>
            <li>
              <h3 className="header-sm">See the winners</h3>
              <FaTrophy
                className={`bg-${theme}`}
                color="rgb(255,215,0)"
                size={140}
              />
            </li>
          </ol>
        </div>
      )}
    </ThemeConsumer>
  );
}

class PlayerInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.username);
  }

  handleChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <form className="column player" onSubmit={this.handleSubmit}>
            <label htmlFor="username" className="player-label">
              {this.props.label}
            </label>
            <div className="row player-inputs">
              <input
                type="text"
                className={`input-${theme}`}
                id="username"
                autoComplete="false"
                placeholder="github username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <button
                type="submit"
                disabled={!this.state.username}
                className={`btn btn-${theme === "light" ? "dark" : "light"}`}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </ThemeConsumer>
    );
  }
}

PlayerInput.propTypes = {
  onSubmit: propTypes.func.isRequired,
  label: propTypes.string.isRequired,
};

function PlayerPreview({ username, onReset, label }) {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className="column player">
          <h3 className="player-label">{label}</h3>
          <div className={`row bg-${theme}`}>
            <div className="player-info">
              <img
                src={`https://github.com/${username}.png?size=200`}
                className="avatar-sm"
                alt={`Avatar for ${username}`}
              />
              <a href={`https://github.com/${username}`} className="link">
                {username}
              </a>
            </div>
            <button className="btn-clear flex-center" onClick={() => onReset()}>
              <FaTimesCircle color="rgb(194,57,42)" size={26} />
            </button>
          </div>
        </div>
      )}
    </ThemeConsumer>
  );
}

PlayerPreview.propTypes = {
  username: propTypes.string.isRequired,
  onReset: propTypes.func.isRequired,
  label: propTypes.string.isRequired,
};

export default class Battle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOne: null,
      playerTwo: null,
    };

    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleReset(id) {
    this.setState({
      [id]: null,
    });
  }

  handleSubmit(id, player) {
    this.setState({
      [id]: player,
    });
  }

  render() {
    const { playerOne, playerTwo } = this.state;

    return (
      <React.Fragment>
        <Instructions />

        <div className="players-container">
          <h1 className="center-text header-lg">Player</h1>
          <div className="row space-around">
            {this.state.playerOne === null ? (
              <PlayerInput
                label="player One"
                onSubmit={(player) => this.handleSubmit("playerOne", player)}
              />
            ) : (
              <PlayerPreview
                username={this.state.playerOne}
                label="player One"
                onReset={() => this.handleReset("playerOne")}
              />
            )}
            {this.state.playerTwo === null ? (
              <PlayerInput
                label="player Two"
                onSubmit={(player) => this.handleSubmit("playerTwo", player)}
              />
            ) : (
              <PlayerPreview
                username={this.state.playerTwo}
                label="player One"
                onReset={() => this.handleReset("playerTwo")}
              />
            )}
          </div>
          {playerOne && playerTwo && (
            <Link
              className="btn-center btn dark-btn btn-space"
              to={{
                pathname: "/battle/result",
                search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`,
              }}
            >
              Battle
            </Link>
          )}
        </div>
      </React.Fragment>
    );
  }
}
