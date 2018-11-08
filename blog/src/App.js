import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Users from './Users'

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    }
  }
  componentDidMount() {
    axios
    .get('http://lee-blog.herokuapp.com/api/users')
    .then(response => {
      this.setState({
        users: response.data
      })
    })
    .catch(error => {
      console.log(error);
    })
  }
  render() {
    return (
      <div className="App">
      <Users users={this.state.users} />
      </div>
    );
  }
}

export default App;
