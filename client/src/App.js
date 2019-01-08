import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Route, Link, NavLink } from "react-router-dom";

import SingleUser from "./components/SingleUser";
import UserList from "./components/UserList";

class App extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/users")
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    const { users } = this.state;

    return (
      <div className="App">
        <h1>Welcome to Holden's API page</h1>
        <nav>
          <NavLink to="/" className="navlink">
            Home
          </NavLink>
          <NavLink to="/users" className="navlink">
            User Page
          </NavLink>
        </nav>
        <Route
          exact
          path="/"
          render={() => (
            <Link to="/users" className="link">
              Click Here to Enter
            </Link>
          )}
        />
        <Route exact path="/users" render={props => <UserList {...props} users={users} />} />
        <Route exact path="/users/:id" render={props => <SingleUser {...props} />} />
      </div>
    );
  }
}

export default App;
