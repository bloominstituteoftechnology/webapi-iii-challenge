import React, { Component } from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';

import UserList from './components/UserList';
import UserCard from './components/UserCard';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: {},
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axios.get('http://localhost:4000/api/users')
    .then((users) => {
      console.log(users);
      this.setState({
        users: users.data,
      })
    })
    .catch((error) => {
      console.log(`Server returned error of: ${error}`);
    })
  }

  getUserPosts = (id) => {
    axios.get(`http://localhost:4000/api/users/${id}/posts`)
    .then((posts) => {
      return posts.data;
    })
    .catch((error) => {
      console.log(`Server returned error of: ${error}`)
    })
  }

  render() {
    if (!this.state.users.length) {
      return (
        <div className="App">
          <h1>Loading Users...</h1>
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <Route exact 
            path='/'
            render={(props) => <UserList {...props} users={this.state.users} />}
          />
          <Route
            path='/user/:id'
            render={(props) => <UserCard {...props} users={this.state.users} getUserPosts={this.getUserPosts}/>}
          />
        </div>
      )
    }
  }
}

export default App;
