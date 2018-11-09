import React, { Component } from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import BlogListView from './components/blogListView'
import SingleUser from './components/SingleUser'

import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      posts: [],
    }
  }

componentDidMount() {
  axios.all([
    axios.get('http://localhost:9000/users'),
    axios.get('http://localhost:9000/posts')
  ])
  .then(axios.spread((userRes, postRes) => {
    this.setState({
      users: userRes.data,
      posts: postRes.data
    })
  }))
}


  render() {
    return (
      <div className="App">
        <Route path='/' exact render={props => <BlogListView {...props} users={this.state.users} posts={this.state.posts} />}/>
        <Route path='/:id' render={props => <SingleUser {...props} users={this.state.users} posts={this.state.posts}/>}/>
      
      </div>
    );
  }
}

export default App;
