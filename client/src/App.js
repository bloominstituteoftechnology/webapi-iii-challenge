import React, { Component } from 'react';
import UserList from './components/UserList';
import LinkedUser from './components/LinkedUser';
import { Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>

        <Route
          exact
          path="/users"
          render={props => (
	          <div>
	            <UserList {...props} />
	          </div>
          )}
        />

        <Route
          exact
          path="/users/:id"
          render={props => (
	          <div>
	            <LinkedUser {...props} />
	          </div>
          )}
        />

      </div>
    );
  }
}

export default App;
