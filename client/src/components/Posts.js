import React, { Component } from 'react';
import Post from './Post';

class Posts extends Component {
  state = {};

  render() {
    return (
      <div className="Posts">
        {this.props.posts.map(post => (
          <Post
            post={post}
            key={post.id}
            userName={this.props.users.find(user => user.id === post.userId)}
          />
        ))}
      </div>
    );
  }
}

export default Posts;
