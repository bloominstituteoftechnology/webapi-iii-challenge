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
    axios.get('http://localhost:5000/api/users')
      .then(({ data }) => this.setState({ users: [ ...data ] }))
      .catch(err => console.log(`ERR: ${ err }`));
  }
  
  render() {
    return (
      <div className="App">
        <Route exact path='/' render={ props => <Users { ...props } users={ this.state.users } /> } />
        <Route path='/:id' component={ props => <User { ...props } users={ this.state.users } /> } />
      </div>
    );
  }
}

export default App;
