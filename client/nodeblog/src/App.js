import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Header from './Header';
import UserList from './UserList';
import { Route, Switch } from "react-router-dom";
import UserPosts from './UserPosts';
import UserCard from './UserCard';

class App extends Component {


      render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Lambda Node Blog</h1>
            <p>Lord of the Rings Wiki</p>
            
            <div className="nav-bar">
              <h4>Blog</h4>
              <h4>Characters</h4>
              <h4>Posts</h4>
              <h4>The Novels</h4>
              <h4>The Films</h4>
              <h4>Contact Me!</h4>
          </div>
        </header>
        <div className="route">
          <Switch>
            <Route exact path="/" component={Header} />
            <Route path="/users" component={UserList}/>
            <Route path="/posts" component={UserPosts}/>
            <Route path="/users/:id" component={UserCard}/>
          </Switch>
        </div>
        
      </div>
    );
  }
}

export default App;
