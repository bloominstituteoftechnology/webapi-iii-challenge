import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import UserPost from "./UserPost";

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [
        {
          name: ""
        }
      ]
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:8000/api/users")
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    console.log("this.state.users is: ", this.state.users);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Route
          exact
          path="/"
          render={() => (
            <div>
              {this.state.users.map(user => {
                return (
                  <Link to={`/users/${user.id}`}>
                    <p>{user.name}</p>
                  </Link>
                );
              })}
            </div>
          )}
        />

        <Route exact path="/users/:id" component={UserPost} />
      </div>
    );
  }
}

export default App;
