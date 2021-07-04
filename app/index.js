import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Popular from "./Components/Popular";
// import Battle from "./Components/Battle";
// import Result from "./Components/Result";
import Loading from "./Components/Loading";

import "./index.css";
import { ThemeProvider } from "./Context/Theme";
import Nav from "./Components/Nav";
// import Loadable from "react-loadable";

// code splitting done on popular component since it load tons of
// // shit during front page loads
// const LoadablePopular = Loadable({
//   loader: () => import("./Components/Popular"),
//   loading() {
//     return <h1>Loading...</h1>;
//   },
// });

const Battle = React.lazy(() => import("./Components/Battle"));
const Popular = React.lazy(() => import("./Components/Popular"));
const Result = React.lazy(() => import("./Components/Result"));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: "light",
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === "light" ? "dark" : "light",
        }));
      },
    };
  }

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className="container">
              {/* <Popular /> */}
              <Nav />
              {/* <Battle /> */}
              <React.Suspense fallback={<Loading />}>
                <Switch>
                  <Route exact path="/" component={Battle} />
                  <Route exact path="/popular" component={Popular} />
                  <Route path="/battle/result" component={Result} />
                  <Route
                    render={() => <h1>404 You have Came to wrong page ❌</h1>}
                  />
                </Switch>
              </React.Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
