import React, { Component } from 'react';
import logo from './logo.svg';
import axios from "axios";
import './App.css';
import './index.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [] 
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:5001/api/users/')
      .then(response => {
        console.log(response.data);
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
        <div>
        {this.state.users.map(user => {
            return <p className="text-white" key={user.id}>{user.name}</p>
        })}
        </div>
      </div>
    );
  }
}

export default App;
