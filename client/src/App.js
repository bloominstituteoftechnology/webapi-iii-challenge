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
    axios
      .get("http://localhost:7000/api/users/")
      .then(res => this.setState({ posts: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    console.log("log", this.state.posts);
    return (
      <div>
        {this.state.posts.map(user => {
          return <p key={user.id}>{user.name}</p>;
        })}
      </div>
    );
  }
}

export default App;
