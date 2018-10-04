import React from 'react';
import UserPost from './UserPost';

class UserPostList extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.userPosts.map(userPost => {
            console.log(userPost);
            return (
              <UserPost key={userPost.id ? userPost.id : Math.random() * 1000} userPost={userPost} />
            )
          })
        }
      </div>
    )
  }
}

export default UserPostList;