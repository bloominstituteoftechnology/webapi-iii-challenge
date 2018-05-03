import React, { Component } from "react";
import { Route } from "react-router-dom";
import UserList from "./components/UserList";

export default class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/api/users" component={UserList} />
      </div>
    );
  }
}
