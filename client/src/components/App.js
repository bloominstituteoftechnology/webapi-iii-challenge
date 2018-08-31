import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { fetchUserData } from "../actions/index";
import AllUserCards from "./allusercards/AllUserCards";

import "../css/App.css";

class App extends Component {
  componentDidMount() {
    this.props.fetchUserData();
  }

  render() {
    console.log("New State", this.props);
    if (this.props.users.length < 1) {
      return (
        <div>
          <h1>Loading Please Wait...</h1>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Router>
            <Route
              exact
              path="/users"
              render={props => (
                <AllUserCards {...props} users={this.props.users} />
              )}
            />
          </Router>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    isFetching: state.isFetching,
    isFetched: state.isFetched,
    hasError: state.hasError,
  };
};

export default connect(
  mapStateToProps,
  { fetchUserData },
)(App);
