import React from "react";
import propTypes from "prop-types";
import Hover from "./Hover";

const styles = {
  container: {
    position: "relative",
    display: "flex",
  },
  tooltip: {
    boxSizing: "border-box",
    position: "absolute",
    width: "160px",
    bottom: "100%",
    left: "50%",
    marginLeft: "-80px",
    borderRadius: "3px",
    backgroundColor: "hsla(0,0%,20%,0.9)",
    padding: "7px",
    marginBottom: "5px",
    color: "white",
    textAlign: "center",
    fontSize: "14px",
  },
};

// class ToolTip extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       hovering: false,
//     };
//     this.mouseOut = this.mouseOut.bind(this);
//     this.mouseOver = this.mouseOver.bind(this);
//   }

//   mouseOver() {
//     this.setState({ hovering: true });
//   }

//   mouseOut() {
//     this.setState({ hovering: false });
//   }

//   render() {
//     const { text, children } = this.props;
//     const { hovering } = this.state;

//     return (
//       <div
//         style={styles.container}
//         onMouseOver={this.mouseOver}
//         onMouseOut={this.mouseOut}
//       >
//         {hovering === true && <div style={styles.tooltip}>{text}</div>}
//         {children}
//       </div>
//     );
//   }
// }

// export default ToolTip;

function ToolTip({ text, children }) {
  return (
    <Hover>
      {(hovering) => (
        <div style={styles.container}>
          {hovering === true && <div style={styles.tooltip}>{text}</div>}
          {children}
        </div>
      )}
    </Hover>
  );
}

ToolTip.propTypes = {
  text: propTypes.string.isRequired,
  children: propTypes.array.isRequired,
};

export default ToolTip;
