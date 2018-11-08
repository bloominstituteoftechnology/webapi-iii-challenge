import React, { Component } from "react";
import "./App.css";

import axios from "axios";
import { Route } from "react-router-dom";

import Users from "./components/Users.js";
import Posts from "./components/Posts.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/users")
      .then(response => this.setState({ users: response.data }))
      .catch(error => console.log(error));

    axios
    .get("http://localhost:8000/api/posts")
    .then(response => this.setState({ posts: response.data }))
    .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/api/users" render={props => <Users {...props} users={this.state.users} />}/>
        <Route path="/api/posts/:id" render={props => <Posts {...props} />}/>
      </div>
    );
  }
}

export default App;
