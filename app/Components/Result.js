import React, { Component } from "react";
import { battle } from "./../utils/api";
import propTypes from "prop-types";
import Card from "./Card";
import {
  FaBriefcase,
  FaCompass,
  FaUser,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import ToolTip from "./ToolTip";
import Loading from "./Loading";
import { Link } from "react-router-dom";

function ProfileList({ profile }) {
  return (
    <ul className="card-list">
      <li>
        <FaUser color="rgb(239,155,155)" size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <ToolTip text="User Location">
            <FaCompass color="rgb(144,246,155)" size={22} />
            {profile.location}
          </ToolTip>
        </li>
      )}
      {profile.company && (
        <li>
          <ToolTip text="User Company">
            <FaBriefcase color="rgb(144,246,155)" size={22} />
            {profile.location}
          </ToolTip>
        </li>
      )}
      <li>
        <FaUsers color="rgb(129,195,245)" size={22} />
        {profile.followers.toLocaleString()} Followers
      </li>
      <li>
        <FaUserFriends color="rgb(64,183,93)" size={22} />
        {profile.following.toLocaleString()} Following
      </li>
    </ul>
  );
}

ProfileList.propTypes = {
  profile: propTypes.object.isRequired,
};

export default class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const playerOne = params.get("playerOne");
    const playerTwo = params.get("playerTwo");

    // const { playerOne, playerTwo } = this.props;

    battle([playerOne, playerTwo])
      .then((player) => {
        this.setState({
          winner: player[0],
          loser: player[1],
          error: null,
          loading: false,
        });
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false,
        });
      });
  }

  render() {
    const { winner, loser, error, loading } = this.state;

    if (loading === true) {
      // return <p className="text-center text-lg">Loading..</p>;
      return <Loading />;
    }

    if (error) {
      return <p className="text-center text-lg">{error}</p>;
    }

    return (
      <React.Fragment>
        <div className="grid space-around container-sm">
          <Card
            header={winner.score === loser.score ? "Tie" : "Winner"}
            subheader={`Score: ${winner.score.toLocaleString()}`}
            avatar={winner.profile.avatar_url}
            href={winner.profile.html_url}
            name={winner.profile.login}
          >
            <ProfileList profile={winner.profile} />
          </Card>

          <Card
            header={winner.score === loser.score ? "Tie" : "loser"}
            subheader={`Score: ${loser.score.toLocaleString()}`}
            avatar={loser.profile.avatar_url}
            href={loser.profile.html_url}
            name={loser.profile.login}
          >
            <ProfileList profile={loser.profile} />
          </Card>
        </div>
        <Link to="/battle" className="btn-center btn dark-btn btn-space">
          Reset
        </Link>
      </React.Fragment>
    );
  }
}

Result.propTypes = {
  onReset: propTypes.func.isRequired,
  location: propTypes.object.isRequired,
};
