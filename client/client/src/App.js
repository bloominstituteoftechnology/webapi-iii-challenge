import React, { Component } from "react";
import { Route } from "react-router";
import { Link } from 'react-router-dom';
import ViewUsers from "./components/ViewUsers";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h3>Hello</h3>
        <Link exact to="/api/users" >
          <button>View All Users</button>
        </Link>
        <Route exact path="/api/users" component={ViewUsers} />
      </div>
    );
  }
}

export default App;
