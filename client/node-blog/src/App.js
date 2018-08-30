import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

import Home from './components/Home';
import Users from './components/Users';
import Posts from './components/Posts';
import UserPosts from './components/UserPosts';


const url = 'http://localhost:7000/users';


// App Handles usersData => Sends usersData to Posts, Users, UserPosts
class App extends Component {
  state = {
    isAtHome: false,
    usersData: []
  }

  componentDidMount() {
    axios.get(url)
    .then(res => {
      this.setState({usersData: res.data})
    })
    .catch(err => console.log(err))
  }

  isAtHomeHandler = () => {
    this.setState(prevState => {
      return {isAtHome: !prevState.isAtHome};
    })
  }

  // Main menu(does not not @ home) + Routes
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {!this.state.isAtHome ? <NavLink className="App-nav-item" to="/users">Users</NavLink>: null}
          <div>
            <NavLink to="/"><img src={logo} className="App-logo" alt="logo" /></NavLink>
            <h1 className="App-title">Welcome to Your Blog</h1>
          </div>
          {!this.state.isAtHome ? <NavLink className="App-nav-item" to="/posts">Posts</NavLink>: null}
        </header>
        <Route exact path="/" render={() => <Home isAtHomeHandler={this.isAtHomeHandler} /> } />
        <Route exact path="/users" render={props => <Users {...props} users={this.state.usersData} /> } />
        <Route path="/posts" render={props => <Posts {...props} users={this.state.usersData} /> } />
        <Route path="/users/:id" render={props => <UserPosts {...props} users={this.state.usersData} /> } />
      </div>
    );
  }
}

export default App;
