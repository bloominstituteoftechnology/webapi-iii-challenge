import React, { Component } from 'react';
import './App.css';

import axios from 'axios';
import { Route } from 'react-router-dom';

import PostsList from './components/PostsComponent/PostsList';
import PostPage from './components/PostsComponent/PostPage';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      username: '',
      text: ''
    }
  }
  componentDidMount() {
    axios
      .get("http://localhost:9000/api/posts")
      .then(res => this.setState({ posts: res.data }))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="App">
        <PostsList posts={this.state.posts}/>

        <Route
          exact
          path="/api/posts/:id"
          render={props => (
            <PostPage
              {...props}
              posts={this.state.posts}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
