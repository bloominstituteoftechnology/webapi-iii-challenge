import React, { Component } from 'react';
import './App.css';

import axios from 'axios';



import { Link, Route } from 'react-router-dom';

import UserView from './components/UserView'
import CreateUser from './components/CreateUser'
import PostList from './components/PostList'

import styled from 'styled-components';

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
`

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




  handleAddNewUser = user => {
    axios 
    .post(`http://localhost:3000/api/users`, user)
    .then(response => {
          axios 
          .get(`http://localhost:3000/api/users`)
          .then(response => {
            this.setState({ users: response.data })
          })
          .catch(err => {
            console.log("Fail to GET users from local server", err)
          })
    })
    .catch(err => {
      console.log("Fail to add a new user to the server", err)
    })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/users/create">Create User</StyledLink>
          <StyledLink to="/posts/">Post List</StyledLink>

          <h1>
            Users List
          </h1>

        </header>

        <div className="container">
          <Route exact path="/users/:id"
            render={props => <UserView {...props} users={this.state.users} posts={this.state.posts}/>}
          />

          <Route path="/users/create"
            render={props => <CreateUser {...props} handleAddNewUser={this.handleAddNewUser} users={this.state.users}/>}
          />

          <Route path="/posts"
            render={props => <PostList />}
          />

        </div>



      </div>
    );
  }
}

export default App;
