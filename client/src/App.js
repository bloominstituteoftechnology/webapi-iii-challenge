import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Route, NavLink, withRouter } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
import Home from "./components/Home";
class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:7000/api/users/")
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err));
    axios
      .get("http://localhost:7000/api/posts/")
      .then(res => this.setState({ posts: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    console.log("log", this.state.posts);
    return (
      <div>
        <nav>
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
        </nav>
        <Route exact path="/" render={props => <Home users={this.state.users} posts={this.state.posts} />} />
        <Route path="/users" render={props => <Users {...props} users={this.state.users} />} />
        <Route path="user/:id" render={props => <User {...props} />} />
      </div>
    );
  }
}

export default withRouter(App);
