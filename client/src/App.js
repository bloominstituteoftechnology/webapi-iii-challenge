import React, { Component } from 'react';
import { Route } from 'react-router';
import axios from 'axios';

import Users from './components/Users/Users';
import User from './components/Users/User';

import './App.css';

class App extends Component {
  state = {
    users: [],
    user: []
  };
  
  renderCorrectUser = id => {
    const selectUser = [];
    for (let user of this.state.users) {
      if (id === user.id) {
        selectUser.push(user);
      }
    }
    this.setState({ user: [ ...selectUser ] }, () => console.log(this.state));
  }
  
  componentDidMount() {
    axios.get('http://localhost:5000/api/users')
      .then(({ data }) => this.setState({ users: [ ...data ] }))
      .catch(err => console.log(`ERR: ${ err }`));
  }
  
  render() {
    return (
      <div className="App">
        <Route exact path='/' render={ props => <Users { ...props } users={ this.state.users } renderCorrectUser={ this.renderCorrectUser } /> } />
        <Route path='/:id' component={ props => <User { ...props } user={ this.state.user } /> } />
      </div>
    );
  }
}

export default App;
