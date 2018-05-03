import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/users/UserList';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <UserList/>
      </div>
    );
  }
}

export default App;
