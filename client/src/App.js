import React, { Component } from 'react';
import axios from 'axios';
import UsersList from './components/UsersList';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5555/api/users`)
      .then(response => {
        this.setState(Object.assign({}, this.state, {users: response.data}));
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.state.users.map(user => {
          return <UsersList user={user} />
        })}
      </div>
    );
  }
}

export default App;
