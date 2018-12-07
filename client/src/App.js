import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
// import logo from './logo.svg';
// import './App.css';

// import { MyApiClient } from "./my-api-clint";

import Users from "./components/Users.js";
import UserPosts from "./components/UserPosts.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:4000/api/users/")
      .then(response => this.setState({ users: response.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={props => <Users {...props} users={this.state.users} />}
        />

        <Route
          path="/:id"
          render={props => <UserPosts {...props} users={this.state.users} />}
        />
      </div>
    );
  }
}

export default App;
