import React, { Component } from "react";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:9000/api/users")
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => console.log(err));
    axios
      .get("http://localhost:9000/api/posts")
      .then(res => this.setState({ posts: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return this.state.posts.length > 0 ? (
      <>
        {this.state.posts.map(post => (
          <div key={post.id}>
            <h3>
              {`Author: ${
                this.state.users.find(user => user.id === post.userId).name
              }`}
            </h3>
            <p>{post.text}</p>
          </div>
        ))}
      </>
    ) : (
      <div>Loading...</div>
    );
  }
}
