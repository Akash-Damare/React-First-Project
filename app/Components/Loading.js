import React from "react";
import styles from "./Loading.module.css";

class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "Loading",
    };
  }

  componentDidMount() {
    this.interval = window.setInterval(() => {
      this.state.content === "Loading" + "..."
        ? this.setState({ content: "Loading" })
        : this.setState(({ content }) => ({ content: content + "." }));
    }, 300);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <p className={styles.text}>{this.state.content}</p>
        <div className={styles.loader}></div>
      </div>
    );
  }
}

export default Loading;
