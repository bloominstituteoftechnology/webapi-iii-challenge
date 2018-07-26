import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import UserList from './components/UserList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <h1>Blogs!</h1>
        <Route exact path="/" component={UserList} />
      </div>
    );
  }
}

export default App;
