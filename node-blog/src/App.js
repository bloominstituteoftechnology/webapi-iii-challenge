import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Posts from './components/Posts';
import Post from './components/Post';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import Users from './components/Users';
import User from './components/User';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/posts' component={Posts} />
        <Route path='/posts/:id' component={Post} />
        <Route path='/users' component={Users} />
        <Route path='/users/:id' component={User} />
        <Route path='/posts/new' component={NewPost} />
        <Route path='/posts/edit' component={EditPost} />
      </div>
    );
  }
}

export default App;
