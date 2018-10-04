import React from 'react';
import axios from 'axios';
import UserPostList from './UserPostList';

class User extends React.Component {
  state = {
    userPosts: [],
    userPostsError: null
  }
  componentDidMount() {
    axios
      .get(`http://localhost:9000/users/${this.props.user.id}/posts`)
      .then(userPosts => this.setState({userPosts: userPosts.data}))
      .catch(err => this.setState({userPostsError: err}));
  }
  render() {
    return (
      <div>
        <h4>{this.props.user.name}</h4>
        <UserPostList userPosts={this.state.userPosts} />
      </div>
    )
  }
}

export default User;