import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
class User extends React.Component {
  state = {
    userPosts: [],
    userPostsError: null,
  };
  componentDidMount() {
    axios
      .get(`http://localhost:9000/users/${this.props.user.id}/posts`)
      .then(userPosts => this.setState({ userPosts: userPosts.data }))
      .catch(err => this.setState({ userPostsError: err }));
  }
  render() {
    return (
      <div>
        <Link to={{
          pathname: `/users/${this.props.user.id}/posts`,
          state: {
            userPosts: this.state.userPosts
          }
        }}><h4>{this.props.user.name}</h4></Link>
      </div>
    );
  }
}

export default User;
