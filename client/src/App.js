import React, { Component } from 'react';
import './App.css';
import Users from './Components/Users.js'
import { Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
          <h1>Client...</h1>
          <Route exact  path = '/' component = {Users} />

      </div>
    );
  }
}

export default App;
