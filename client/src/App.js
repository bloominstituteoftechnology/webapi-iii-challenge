import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import { Jumbotron } from 'reactstrap';
import { Route } from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      posts: [],
      tags: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5555/api/users/').then((result) => {
      this.setState({ users: result.data.users})
    })

    axios.get('http://localhost:5555/api/posts/').then((result) => {
      this.setState({ posts: result.data.post})
    })

    axios.get('http://localhost:5555/api/tags/').then((result) => {
      this.setState({ tags: result.data.tag})
    })
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => (
          this.state.users.map((user, index) => {
            return (
              <Jumbotron>
                <h1 className="display-3">{user.name}</h1>
              </Jumbotron>
            )
          })
        )} />
        <Route path="/users/:id" render={(props) => (
          this.state.posts
            .filter((post) => props.match.params.id == post.userId)
            .map((post, index) => {
              return (
                <Jumbotron>
                  <h1 className="display-3">{post.text}</h1>
                </Jumbotron>
              )
            })
        )} />
      </div>
    );
  }
}

export default App;
