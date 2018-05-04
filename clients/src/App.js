import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import { Route } from 'react-router-dom';
import UserInfo from './userInfo';
import Users from './users';
import PostList from './postList'
class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact component={Users} />
          <Route path="/user" exact component={UserInfo} />
          <Route path="/posts/:id" exact component={PostList} />
        </div>
      </Router>

    );
  }
}

export default App;
