import React from "react";
import axios from "axios";

import { MyApiClient } from "../my-api-clint";

class UserPosts extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      posts: []
    };
  }

  componentDidMount = () => {
    const id = this.props.match.params.id;
    this.getUserAndPosts(id);
  };

  getUserAndPosts = id => {
    MyApiClient.get(`/users/${this.props.match.params.id}`)
      .then(response => {
        this.setState({ user: response.data });
      })
      .then(
        MyApiClient.get(`/users/${this.props.match.params.id}/posts`).then(
          response => this.setState({ posts: response.data })
        )
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h2>{this.state.user.name}</h2>
        <div>
          {this.state.posts.map(post => {
            <p>{post.text}</p>;
          })}
        </div>
      </div>
    );
  }
}
