import React, { Component } from 'react';
import axios from 'axios';

export default class Users extends Component() {
  state = {
    users: []
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/users/')
      .then(res => {this.setState = ({user:res.data})})
  }

  render() {
    return(
      <div>
        {this.state.users}
      </div>
    );
  }
}