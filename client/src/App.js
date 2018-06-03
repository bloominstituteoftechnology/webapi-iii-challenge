import React, { Component } from 'react';
import { Route } from 'react-router';
import axios from 'axios';

import Users from './components/Users/Users';
import User from './components/Users/User';

import './App.css';

class App extends Component {
  state = {
    users: [],
  };
  
  componentDidMount() {
    axios.get('/api/users')
      .then(({ data }) => this.setState({ users: [ ...data ] }))
      .catch(err => console.log(`ERR: ${ err }`));
  }
  
  render() {
    return (
      <div className="App">
        <div className='App__header-container'>
          <h1 className='header-container__h1'>Lord of The Posts</h1>
        </div>
        <Route exact path='/' render={ props => <Users { ...props } users={ this.state.users } /> } />
        <Route path='/:id' component={ props => <User { ...props } users={ this.state.users } /> } />
      </div>
    );
  }
}

export default App;
