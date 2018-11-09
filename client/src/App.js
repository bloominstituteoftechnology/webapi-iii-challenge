import React, { Component } from 'react';
import axios from 'axios';

import Postlist from './components/Postlist';
import Userlist from './components/Userlist';


import './App.css';

const url = "http://localhost:9000";


class App extends Component {
  constructor(){
    super();
    this.state = {
      users: [],
      posts: []
    }
  }


  getUsers(){
    axios
      .get(`${url}/users`)
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err));
    console.dir(this.users);
  }

  getPosts(){
    axios
      .get(`${url}/posts`)
      .then(res => this.setState({ posts: res.data }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getUsers();
    this.getPosts();
  }


  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        <Userlist users={this.state.users} />
        <Postlist posts={this.state.posts} />
      </div>
    );
  }
}

export default App;
