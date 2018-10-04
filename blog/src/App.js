import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux';
import {fetchPosts} from './actions/index';
import PostsList from './components/PostsList';
import PostForm from './components/PostForm';
import PostDetails from './components/PostDetails';
import PostEdit from './components/PostEdit';
import UsersList from './components/UsersList';
import UserDetails from './components/UserDetails';
import {Switch, Route, Link, withRouter} from 'react-router-dom';


class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      search: ''
    }
  }
  render() {
    return (
      <div className="App">
      
      <Switch>
        <Route exact path = '/' render={(props) => {
          
          return (
            <div className = 'component-container'>

            <div className = 'post-components'>
            <PostForm></PostForm>
            <PostsList></PostsList>
            </div>
            <div className = 'user-components'>
            <UsersList></UsersList>
            </div>

            </div>
          )
        }
        } />

        <Route exact path = '/posts/:id' render = {(props) => {
          return <PostDetails />
        }
        } />

        <Route exact path = '/posts/edit/:id' render = {(props) => {
          return  <PostEdit  />
        }
        } />

        <Route exact path = '/users/:id' render = {(props) => {
          return <UserDetails />
        }} />

        </Switch>
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}

export default withRouter(connect(mapStateToProps, {
  fetchPosts
})(App));
