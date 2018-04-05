import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Users from './components/Users/Users';
import UserProfile from './components/UserProfile/UserProfile';
import PostFeed from './components/PostFeed/PostFeed';
import Home from './components/Home/Home';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={Home} />
        <Route exact path='/users' component={Users} />
        <Route path='/users/:id' component={UserProfile} />
        <Route path='/posts' component={PostFeed} />
      </div>
    );
  }
}

export default App;
