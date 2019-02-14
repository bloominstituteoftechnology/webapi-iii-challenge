import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      text: '',
    };
  }

  componentDidMount = () => {
    axios
      .get('http://localhost:3333/api/posts')
      .then(res => {
        this.setState({ posts: res.data.posts });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log(this.state.posts);
    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>Posts List</h2>
        <section className='postsContainer'>
            {this.state.posts.map(post => {
            return <Post key={post.id} post={post}/>
        })}
        </section>
        
      </div>
    );
  }
}

export default Posts;
