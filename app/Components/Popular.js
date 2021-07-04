import React, { Component } from "react";
import propTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";
import Card from "./Card";
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from "react-icons/fa";
import Loading from "./Loading";
import ToolTip from "./ToolTip";

function LanguageNav({ selectedLang, changeLang }) {
  const languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];
  return (
    <ul className="flex-center">
      {languages.map((language) => (
        <li key={language}>
          <button
            className="btn-clear nav-link"
            style={language === selectedLang ? { color: "rgb(187,5,6)" } : null}
            onClick={() => changeLang(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

LanguageNav.propTypes = {
  selectedLang: propTypes.string.isRequired,
  changeLang: propTypes.func.isRequired,
};

function ReposGrid({ repos }) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        // eslint-disable-next-line no-unused-vars
        const { name, owner, html_url, stargazers_count, forks, open_issues } =
          repo;
        const { login, avatar_url } = owner;

        return (
          <li key={html_url}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={login}
            >
              <ul className="card-list">
                <li>
                  <ToolTip text="Github Username">
                    <FaUser color="rgb(255,191,116)" size={22} />
                    <a href={`https://github.com/${login}`}>{login}</a>
                  </ToolTip>
                </li>
                <li>
                  <FaStar color="rgb(255,215,0)" size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color="rgb(129,195,245)" size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color="rgb(241,138,147)" size={22} />
                  {open_issues.toLocaleString()} Open Isuuses
                </li>
              </ul>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

ReposGrid.propTypes = {
  repos: propTypes.array.isRequired,
};

export default class Popular extends Component {
  state = {
    selectedLang: "All",
    error: null,
    repos: {},
  };

  componentDidMount() {
    this.changeLang(this.state.selectedLang);
  }

  changeLang = (selectedLang) => {
    this.setState({
      selectedLang: selectedLang,
      error: null,
    });

    if (!this.state.repos[selectedLang]) {
      fetchPopularRepos(selectedLang)
        .then((data) => {
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selectedLang]: data,
            },
          }));
        })
        .catch((err) => {
          console.warn("Something happen", err);

          this.setState({
            error: "There was an error fetching this repos!",
          });
        });
    }
  };

  isLoading = () => {
    const { selectedLang, error, repos } = this.state;

    return !repos[selectedLang] && error == null;
  };

  render() {
    const { selectedLang, error, repos } = this.state;

    return (
      <React.Fragment>
        <LanguageNav selectedLang={selectedLang} changeLang={this.changeLang} />
        {/* {this.isLoading() && <p className="text-center header-lg">Loading</p>} */}
        {this.isLoading() && <Loading />}

        {error && <p>{error}</p>}
        {repos[selectedLang] && <ReposGrid repos={repos[selectedLang]} />}
      </React.Fragment>
    );
  }
}
