import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";

import "./App.css";

class App extends Component {
  state = {
    users: [],
    posts: []
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    fetch("http://localhost:4000/api/users")
      .then(res => res.json())
      .then(res => this.setState({ users: res }))
      .catch(err => console.log(err));
  };

  getPosts = () => {
    fetch("http://localhost:4000/api/posts")
      .then(res => res.json())
      .then(res => this.setState({ posts: res }))
      .catch(err => console.log(err));
  };

  getUserPost = (e, user_id) => {
    e.preventDefault();
    const { posts } = this.state;
    fetch(`http://localhost:4000/api/${user_id}/posts`)
      .then(res => res.json())
      .then(this.getPosts)
      .catch(err => console.log(err));
  };

  renderUser = ({ name, id, user_id }) => (
    <div key={id}>
      <p>{name}</p>
      {/* <NavLink to='' ><button>Post</button></NavLink>  */}
      <button onClick={e => this.getUserPost(e, id)}>Post</button>
    </div>
  );

  render() {
    const { users } = this.state;
    return <div className="App">{users.map(this.renderUser)}</div>;
  }
}

export default App;
