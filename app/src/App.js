import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import UsersList from './components/UsersList';
import { Route } from 'react-router-dom'
import LinkUserPostList from './components/LinkUserPostList';

class App extends Component {
  state = {
    users: [],
    posts: [],
    userError: null,
    postError: null
  }
  componentDidMount() {
    axios
      .get('http://localhost:9000/users')
      .then(users => this.setState({users: users.data}))
      .catch(err => this.setState({userError: err}));
    axios
      .get('http://localhost:9000/posts')
      .then(posts => this.setState({posts: posts.data}))
      .catch(err => this.setState({postError: err}));
  }
  render() {
    return (
      <div className="App" style={{margin: '20px'}}>
        <Route exact path = "/" render={(props) => <UsersList {...props} users={this.state.users} /> } />
        <Route exact path="/users/:id/posts" render={(props) => <LinkUserPostList {...props} /> }/>
      </div>
    );
  }
}

export default App;
