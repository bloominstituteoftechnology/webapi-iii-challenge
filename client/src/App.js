import React, { Component } from 'react';
import './App.css';
import { UsersListView, UserPostsView } from './views';
import { Header } from './components';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/' component={Header} />
        <Route exact path='/' render={(props) => <UsersListView {...props}/>} />
        <Route path='/:id' render={(props) => <UserPostsView {...props}/>} />
      </div>
    );
  }
}

export default App;
