import React from 'react';

class LinkUserPost extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.userPost.text ?
          <p>Text: {this.props.userPost.text}</p>
          : <p> No posts found for this user.</p>
        }
      </div>
    )
  }
}

export default LinkUserPost;