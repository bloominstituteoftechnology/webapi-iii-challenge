import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Users from './components/Users/Users';
import UserProfile from './components/UserProfile/UserProfile';
import PostFeed from './components/PostFeed/PostFeed';
import Edit from './components/Edit/Edit';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="Container">
        <div className="App">
        <nav className="Navigation">
          <Link to='/'>
            <h5>Users</h5>
          </Link>
          <Link to='/posts'>
            <h5>Posts</h5>
          </Link>
        </nav>
        <Route exact path='/' component={Users} />
        <Route path='/users/:id' component={UserProfile} />
        <Route path='/posts' component={PostFeed} />
        <Route path='/edit/:id' component={Edit} />
        </div>
      </div>
    );
  }
}

export default App;
