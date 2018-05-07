import React, { Component } from 'react';
const axios = require('axios');




class UserInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: []

    }
  }

  fetchingPosts = () => {

  }



  render() {
    return (
      <div>
        <h1> User information is here </h1>
      </div>

    )
  }
}
export default UserInfo;