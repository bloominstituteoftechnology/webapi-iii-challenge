import React, { Component } from 'react';
import './App.css';

import { Route } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import UsersView from './View/UsersView/';
import ProfileView from './View/ProfileView/';
import MainNav from './components/MainNav/';
import PostsView from './View/PostsView/';
import PostView from './View/PostView';
import CreatePost from './View/CreatePost';

class App extends Component {
  constructor() {
    super();

    this.state = {
      landingButtons: [
        'Home',
        'Users',
        'Posts'
      ]
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Lambda Blog</h1>
          <MainNav buttons={this.state.landingButtons}/>
        </header>
        <Route path='/users' exact component={UsersView} />
        <Route path='/users/:id' exact component={ProfileView} />
        <Route path='/posts/' exact component={PostsView} />
      <Route path='/create/post' exact component={CreatePost} />
        <Route path='/posts/:id' exact render={post => <PostView {...post}/>} />

    </div>
    );
  }
}

export default App;
