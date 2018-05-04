import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import Users from './Components/Users/Users';
import User from './Components/User/User';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      name: '',
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axios
      .get('http://localhost:5000/api/users')
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleNewUser = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addUser = e => {
    const user = {
      name: this.state.name,
    };
    axios
      .post('http://localhost:5000/api/users', user)
      .then(newUser => {
        console.log(newUser);
        this.setState({ name: '' });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return <div className="App">
        <Route exact path="/users" render={props => <Users {...props} users={this.state.users} handleNewUser={this.handleNewUser} addUser={this.addUser} state={this.state} />} />
        <Route exact path="/users/:id" render={props => <User {...props} users={this.state.users} getUsers={this.getUsers} />} />
      </div>;
  }
}

export default App;
