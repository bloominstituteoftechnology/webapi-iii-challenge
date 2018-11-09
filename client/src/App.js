import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Nav from './components/Nav';
import Posts from './components/Posts';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    const { posts } = this.state;
    if (!posts.length) {
      axios
        .get('http://localhost:4000/api/posts')
        .then(res => this.setState({ posts: res.data }))
        .catch(err => console.log(err));
    }
  }

  getUserName = id => {
    axios
      .get(`http://localhost:4000/api/posts/${id}`)
      .then(res => res.data.postedBy)
      .catch(err => console.log(err));
  };

  render() {
    const { posts } = this.state;
    return (
      <div className="App">
        <Nav />
        {!posts.length ? (
          <div>Loading posts...</div>
        ) : (
          <Posts posts={posts} getUserName={this.getUserName} />
        )}
      </div>
    );
  }
}

export default App;
