import React, { Component } from 'react';

class Post extends Component {
  componentDidUpdate() {
    const postedBy = this.getUser();
    console.log(postedBy);
  }
  getUser = async () => {
    await this.props.getUserName(this.props.post.userId);
  };

  render() {
    const { post } = this.props;
    return (
      <div className="Post">
        <i className="fas fa-user" />
        <div className="User">{post.Id}</div>
        <div className="Text">{post.text}</div>
      </div>
    );
  }
}

export default Post;
