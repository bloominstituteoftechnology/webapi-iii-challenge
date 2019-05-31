import React from "react";
import axios from "axios";

export default class Users extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios.get(`http://localhost:3030/users`).then(res => {
        console.log(res.data);
      this.setState({
        users: res.data.users,
      });
    });
  }

  render() {
      return <ul>{this.state.users.map(user => <li>|| {user.name} || {user.bio} </li>)}</ul>

  }
}
