import React, { Component } from 'react';
import axios from 'axios';
import UserItem from './UserItem';

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8000/api/users')
      .then(response => {
        this.setState(() => ({ users: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }

  render() {
    return (
      <div className="user-list">
        {this.state.users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
}
