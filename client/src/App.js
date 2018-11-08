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
    return (
      <>
        {this.state.users.map(user => (
          <div key={user.id}>
            <h2>{user.name}</h2>
          </div>
        ))}
        {this.state.posts.map(post => (
          <div key={post.id}>
            <p>{post.text}</p>
          </div>
        ))}
      </>
    );
  }
}
