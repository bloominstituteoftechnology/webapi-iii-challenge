import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { Route, NavLink, withRouter } from "react-router-dom";
import HomePage from "./components/HomePage";

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
      .get("http://localhost:3000/api/users/")
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err));
    axios
      .get("http://localhost:3000/api/posts/")
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
          </nav>
      </div>
    );
  }
}

export default App;
