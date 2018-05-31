import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import UserList from './components/UserList';

import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      users: []
    };

  }

  componentDidMount () {
   axios
    .get(`http://localhost:8000/api/users`)
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
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.state.users.map(user => {
          return <UserList user={user}/>
        })}
        
      </div>
    );
  }
}

export default App;
