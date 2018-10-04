import React from 'react';

class UserPost extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.userPost.text ? this.props.userPost.text : 'No posts found'}</p>
      </div>
    )
  }
}

export default UserPost;