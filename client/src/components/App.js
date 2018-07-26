import React, { Component } from 'react'
import axios from 'axios';
import 'babel-polyfill';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.url =  'http://localhost:8000/api';
    this.state = {
      posts: [],
      users: [],
      currentUser: undefined,
    }
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const users = await axios.get(`${this.url}/users/`);
      this.setState({ users });
    } catch (err) {
      console.log(err);
    }
  }
  
  render() {
    const users = this.state.posts.map( user => (
    <li key={ user.userId }>
      <a>{ user.name }</a>
    </li>
    ));
    return (
      <div>
        <h2>Select a user</h2>
        {users}
      </div>
    );
  }
}