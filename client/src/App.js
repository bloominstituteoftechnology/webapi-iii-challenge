import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import { Route } from "react-router-dom";
import User from "./User.js";
import PostList from "./PostList.js";

class App extends Component {
  constructor() {
    super()
    this.state = {
      posts: [],
      users: []
    }
  }

  getUsers = () => {
    return axios.get('http://localhost:5000/api/users');
  }
  getPosts = () => {
    return axios.get('http://localhost:5000/api/posts');
  }

  replaceUserId = () => {
    let posts = this.state.posts;
    let users = this.state.users;
    for (let i = 0; i < posts.length; i++) {
      posts[i].userId = users.filter(user => user.id === posts[i].userId)[0].name;
    }
  }

  componentDidMount() {
    axios.all([this.getUsers(), this.getPosts()])
      .then(axios.spread((users, posts) => {
        this.setState({
          users: users.data,
          posts: posts.data
        })
      }))
      .catch(error => {
        console.log(error);
      });
  }
  
  render() {
    return (
      <div className="App">
        <Route exact path="/" render={props => <PostList {...this.state} replaceUserId={this.replaceUserId}/>}/>
        <Route path="/users/:id" render={({match}) => <User match={match} users={this.state.users}/>}/>
        {/* <Route path="/users/:id" render={({ match }) => <User users={this.state.users} match={match}/>}/> */}
      </div>
    );
  }
}

export default App;
