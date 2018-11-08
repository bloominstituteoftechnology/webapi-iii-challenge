import React, { Component } from 'react';
import './App.css';
import Users from './Components/Users.js'
import { Route } from 'react-router-dom';
import Posts from './Components/Posts'


class App extends Component {
  render() {
    return (
      <div className="App">
          <h1>Client...</h1>
          <Route exact  path = '/' component = {Users} />

          <Route exact path = '/users/:id/posts/' component = {Posts} />

      </div>
    );
  }
}

export default App;
