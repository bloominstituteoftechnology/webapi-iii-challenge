// import React from "react";

// const User = props => <div>{props.user}</div>;

// export default User;

import React, { Component } from "react";
import axios from "axios";
export default class User extends Component {
  state = {
    isEditing: false,
    user: null,
    posts: [],
    name: ""
  };

  get id() {
    return this.props.match.params.id;
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8000/api/users/${this.id}`)
      .then(response => {
        this.setState({
          user: response.data,
          name: response.data.name
        });
      })
      .then(response => {
        this.getPosts();
      })
      .catch(error => console.log(error));
  }

  getPosts = () => {
    axios
      .get(`http://localhost:8000/api/users/${this.id}/posts`)
      .then(response => {
        this.setState({
          posts: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    if (!this.state.user) {
      return <div className="main-container User">User is loading...</div>;
    }

    return (
      <div className="main-container user">
        <h2>
          {this.state.name}
          's <span>Posts</span>
        </h2>
        {this.state.posts.map(post => {
          return (
            <div key={post.id} className="post-container">
              <h2>{post.text}</h2>
              <em>{`posted by ${post.postedBy}`}</em>
            </div>
          );
        })}
        <a className="back-lnk" href="/">
          Back
        </a>
      </div>
    );
  }
}
