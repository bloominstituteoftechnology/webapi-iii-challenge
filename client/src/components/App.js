import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserData } from "../actions/index";

import "../css/App.css";

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     users: [],
  //   };
  // }

  componentDidMount() {
    this.props.fetchUserData();
  }

  render() {
    console.log("New State", this.props);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    isFetching: state.isFetching,
  };
};

export default connect(
  mapStateToProps,
  { fetchUserData },
)(App);
