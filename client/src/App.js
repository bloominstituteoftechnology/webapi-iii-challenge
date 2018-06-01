import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import { Link, Route } from "react-router-dom";
import Post from "./Post.js";

class App extends Component {
  constructor() {
    super()
    this.state = {
      posts: [],
      users: []
    }
  }

  getUsers = () => {
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        this.setState({ users: response.data.users })
      });
  }
  getPosts = () => {
    axios.get('http://localhost:5000/api/posts')
      .then(response => {
        this.setState({ posts: response.data.posts })
      });
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
      }))
      .catch(error => {
        console.log(error);
      });
  }
  
  render() {
    this.replaceUserId();
    return (
      <div className="App">
        <div className="post-list">
          {this.state.posts.map(post => {
            return (
              <Link to="/users/:id" key={post.id} className="post">
                <h4>{post.userId}</h4>
                <p>{post.text}</p>
              </Link>
            );
          })}
        </div>
        <Route path="/users/:id" render={props => <Post users={this.state.users}/>}/>
      </div>
    );
  }
}

export default App;
