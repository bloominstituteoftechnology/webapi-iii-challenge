import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import UsersList from './components/UsersList';

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
        <UsersList users={this.state.users} />
      </div>
    );
  }
}

export default App;
