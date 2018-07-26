import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.url = 'http://localhost:8000/api';
    this.state = {
      posts: [],
      users: [],
      currentUser: undefined,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios
      .get('http://localhost:8000/api/users')
      .then((res) => {
      console.log(res);
      this.setState({ users: res.data });
    }).catch((err) => { 
      console.log(err) 
    });
  }

  render() {
    const users = this.state.users.map(user => (
      <li key={user.userId}>
        <a>
          {user.name}
        </a>
      </li>
    ));
    return (
      <div>
        <h2>
Select a user
        </h2>
        {users}
      </div>
    );
  }
}
