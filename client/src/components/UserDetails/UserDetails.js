import React, { Component } from "react";
import PostList from "./PostList";
import axios from "axios";

class UserDetails extends Component {
  state = {
    posts: [],
    newPostInput: ''
  };

  fetchUserPostsData = () => {
    axios
      .get(`http://localhost:7000/users/posts/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          posts: res.data
        });
      });
  };

  handleInput = event => {
      this.setState({
          newPostInput: event.target.value
      })
  }

  render() {
    const user = this.props.users.find(user => {
      return user.id === parseInt(this.props.match.params.id);
    });
    const { name, id } = user ? user : { name: "", id: "" };
    const { posts, newPostInput } = this.state;
    return (
      <div>
        <h1>{name}</h1>
        <div>
          <h3>New Post:</h3>
          <input onChange={this.handleInput} value={newPostInput}/>
        </div>
        <PostList posts={posts} {...this.props} />
      </div>
    );
  }

  componentDidMount() {
    this.fetchUserPostsData();
  }
}

export default UserDetails;
