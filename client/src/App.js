import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import {Route, Link} from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      users: []
    }
  }
  componentDidMount = () => {
    axios.get('http://localhost:9000/post')
    .then(response => {
      this.setState({ posts: response.data })
    })
    .catch( err => {
      console.log(err)
    });
    axios.get('http://localhost:9000/user')
    .then(response => {
      this.setState({ users: response.data })
    })
    .catch( err => {
      console.log(err)
    });
  };

  
  render() {
    return (
      <div className="App">
      <Link to="/posts">Posts:
      
        {this.state.posts.map((post, key) => {
          return (
            <div key={key}>
            <h6>{post.text}</h6>
          </div>
          );
        })}
      </Link>
      <div>Users:
      {this.state.users.map((user, key) => {
        return (
          <div key={key}>
            <h6>{user.name}</h6>
          </div>
          );
        })}
      </div>
        <Route path="/posts"/>
      </div>
    );
  }
}

export default App;
