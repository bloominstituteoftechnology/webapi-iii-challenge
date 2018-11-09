import React, { Component } from 'react';

class Post extends Component {
  render() {
    const { post } = this.props;
    return (
      <div className="Post">
        <i className="fas fa-user" />
        <div className="User">{this.props.userName.name}</div>
        <div className="Text">{post.text}</div>
      </div>
    );
  }
}

export default Post;
