import React, { Component } from "react";
import logo from "./logo.svg";
import { injectGlobal } from "react-emotion";
import UserList from "./components/UserList/UserList";
import { Route, Switch } from "react-router-dom";
import UserContainer from "./components/UserContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <UserContainer />
      </div>
    );
  }
}

export default App;

injectGlobal`
*{
  box-sizing:border-box;
}
`
