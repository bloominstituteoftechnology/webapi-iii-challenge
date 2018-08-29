import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Home from './components/Home';
import Users from './components/Users';
import Posts from './components/Posts';
import UserPosts from './components/UserPosts';

class App extends Component {
  state = {
    isAtHome: false
  }

  isAtHomeHandler = () => {
    this.setState(prevState => {
      return {isAtHome: !prevState.isAtHome};
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {!this.state.isAtHome ? <NavLink to="/users">Users</NavLink>: null}
          <div>
            <NavLink to="/"><img src={logo} className="App-logo" alt="logo" /></NavLink>
            <h1 className="App-title">Welcome to Your Blog</h1>
          </div>
          {!this.state.isAtHome ? <NavLink to="/posts">Posts</NavLink>: null}
        </header>
        <div>
          <Route exact path="/" render={() => <Home isAtHomeHandler={this.isAtHomeHandler} /> } />
          <Route exact path="/users" component={ Users } />
          <Route path="/posts" component={ Posts } />
          <Route path="/users/:id" render={props => <UserPosts {...props} /> } />
        </div>
      </div>
    );
  }
}

export default App;
