import React, { Component } from "react";
import axios from "axios";
import { Route, Switch, withRouter } from "react-router-dom";
import PostList from "../PostComponents/PostList";
import "./index.css";

class App extends Component {
  state = {
    users: [
      { name: "bob" },
      { name: "dave" },
      { name: "steve" },
      { name: "jim" }
    ]
  };

  componentDidMount() {
    this.refetchUsers();
  }

  refetchUsers = () => {
    axios
      .get(`http://localhost:8000/api/users`)
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div className="App">
        <h1>Node Blog</h1>
        <div>
          {this.state.users.map(user => {
            return (
              <Route
                exact
                path="/"
                render={props => <PostList posts={this.state.posts} />}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(App);
