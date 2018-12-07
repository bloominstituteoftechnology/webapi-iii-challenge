import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

import UserList from './components/UserList'

class App extends Component {
  constructor(){
    super();
    this.state = {
      users: [],
      posts: [],
    }
  }

  componentDidMount(){
    axios 
    .get(`http://localhost:3000/api/users`)
    .then(response => {
      this.setState({ users: response.data })
    })
    .catch(err => {
      console.log("Fail to GET users from local server", err)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <h1>
            Users List
          </h1>
          <UserList users={this.state.users}/>


        </header>

      </div>
    );
  }
}

export default App;
