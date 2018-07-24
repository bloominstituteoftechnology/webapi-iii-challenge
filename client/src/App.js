import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Users from './components/Users';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      users: []
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:8000/api/users')
      .then(response => this.setState({ users: response.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Users users={this.state.users} />
      </div>
    );
  }
}

export default App;
