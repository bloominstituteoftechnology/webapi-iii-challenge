import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch("/posts")
      .then(res => res.json())
      .then(posts => this.setState({ posts }));
  }
  render() {
    return (
      <div className="App">
        <h1> Posts </h1>
        <ul>
          {this.state.posts.map(post => (
            <li key={post.id}>
              Text: {post.text} <hr />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
