import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/home.js';
import UserFeed from './components/UserFeed';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/user/:id" component={UserFeed} />
        </Switch>
      </div>
    );
  }
}

export default App;
