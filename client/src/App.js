import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

import UserList from './components/UserList'

import { Link, Route } from 'react-router-dom';

import UserView from './components/UserView'

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
          <Link to="/users/">Main List</Link>

          <h1>
            Users List
          </h1>
          <UserList users={this.state.users}/>

        </header>

        <div className="container">
          <Route exact path="/users/:id"
            render={props => <UserView {...props} users={this.state.users} posts={this.state.posts}/>}
          />
        </div>

      </div>
    );
  }
}

export default App;
