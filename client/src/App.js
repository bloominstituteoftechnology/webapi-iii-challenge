import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Blog</h1>
        </header>
        <Route exact path="/" component={UsersList}/>
        <Route path="/users/:id/posts" component={PostsList}/>
      </div>
    );
  }
}

export default App;
