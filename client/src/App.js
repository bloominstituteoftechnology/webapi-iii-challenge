import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import { Route } from 'react-router-dom'
import User from './components/Users'
import UsersList from './components/UsersList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      posts: [],
      tags: [],
    }
  }
  componentDidMount = () => {
    axios.get('http://localhost:5000/api/users')
      .then(res => {
        // console.log(res)
        this.setState({ users: res.data })
      })
  }
  render() {
    return (
      <div className="App">
        <Route exact path="/" render={(props) => <UsersList {...props} users={this.state.users} />} />
        <Route exact path="/:id" component={User} />
      </div>
    );
  }
}

export default App;
