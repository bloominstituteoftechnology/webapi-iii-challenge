import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      posts: [],
      showPosts: false
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/users')
    .then(response => {
      this.setState({users: response.data})
    }).catch(err => {
      console.log(err);
    })
  }

  showPostsHandler = (event) => {
    console.log(event.target);
    console.log(event.target.getAttribute('id'));
    let id = event.target.getAttribute('id');
    axios.get(`http://localhost:8000/api/users/${id}/posts`)
      .then(response => {
        this.setState({showPosts: !this.state.showPosts, posts: response.data});
      }).catch(err => {
        console.log("Err from app:", err);
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="post-container">
        {
          this.state.users.map(user => {
          return (
            <div onClick={this.showPostsHandler} key={user.id} id={user.id}>
              <h1 id={user.id}>{user.name}</h1>
              <div>{this.state.showPosts ? this.state.posts.map(post => {
                return (
                  <div key={post.id}>
                    <h3>{post.text}</h3>
                    <h6>{post.postedBy}</h6>
                  </div>
                )
              }): <h4>Posts Hidden</h4>}
              </div>
              <hr className="horizontal-rule"/>
            </div>
          )
          })
        }
        </div>
      </div>
    );
  }
}

export default App;
