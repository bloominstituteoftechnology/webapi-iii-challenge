// import React from "react";

// const User = props => <div>{props.user}</div>;

// export default User;

import React, { Component } from "react";
import axios from "axios";
export default class User extends Component {
  state = {
    isEditing: false,
    user: null,
    name: ""
  };

  get id() {
    return this.props.match.params.id;
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8000/api/users/${this.id}`)
      .then(response => {
        this.setState({
          user: response.data,
          name: response.data.name
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    if (!this.state.user) {
      return <div className="main-container User">User is loading...</div>;
    }

    return (
      <div className="main-container user">
        <h2>{this.state.name}</h2>
        <a className="back-lnk" href="/">
          Back
        </a>
      </div>
    );
  }
}
