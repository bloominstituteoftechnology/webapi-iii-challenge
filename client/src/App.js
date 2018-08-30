import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    posts: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:7000/users")
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log("Error getting user data", err);
      });

    axios
      .get("http://localhost:7000/posts")
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.log("Error getting user data", err);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.state.users.map(user => {
          return (
            <div>
              <p>{user.name}</p>
            </div>
          );
        })}
        {this.state.posts.map(post => {
          return (
            <div>
              <p>{post.text}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
