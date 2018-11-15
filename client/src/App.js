import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { Route, NavLink, withRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import User from "./components/User";
import UserPosts from "./components/UserPosts";

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
      .get("http://localhost:4000/users/")
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err));
    axios
      .get("http://localhost:4000/posts/")
      .then(res => this.setState({ posts: res.data }))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="App">
        <nav>
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
          
          </nav>
          <Route exact path="/" render={props => <HomePage users={this.state.users} posts={this.state.posts} />} />
          <Route path="user/:id" render={props => <User {...props} />} />
          <Route path="/users" render={props => <UserPosts {...props} users={this.state.users} />} />
      </div>
    );
  }
}

export default withRouter(App);
