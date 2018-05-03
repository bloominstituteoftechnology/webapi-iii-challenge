import React, { Component } from "react";
import axios from "axios";
import "./UserList.css";

export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/users")
      .then(response => {
        this.setState(() => ({ users: response.data }));
      })
      .catch(error => {
        console.error("Server Error", error);
      });
  }

  render() {
    return (
      <div className="user-list">
        <h1>UserList</h1>
        {this.state.users.map(user => (
          <div className="user" key={user.id}>
            id: {user.id}
            <br />
            name: {user.name}
          </div>
        ))}
      </div>
    );
  }
}
