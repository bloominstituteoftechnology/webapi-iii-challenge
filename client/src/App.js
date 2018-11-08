import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios
      .get("http://localhost:9000/posts/all")
      .then(response => {
        console.log(response.data);
        this.setState({ posts: response.data });
      })
      .catch(error => console.log(error));
  };
  render() {
    return (
      <div className="posts">
        {this.state.posts.map(post => {
          return (
            <div className="posts__post rotated">
              <h3 className="posts__text">"{post.text}"</h3>
              <h6 className="posts__id">User ID: {post.userId}</h6>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
