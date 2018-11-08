import React, { Component } from "react";
import axios from "axios";
import UserCard from "./UserCard";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.fetchUser(id);
  }

  fetchUser = id => {
    axios.get(`http://localhost:7000/api/users/${id}`).then(res => console.log(res));
  };

  render() {
    if (!this.state.user) {
      return <div>loading user information</div>;
    }
    return <UserCard user={this.state.user} />;
  }
}
