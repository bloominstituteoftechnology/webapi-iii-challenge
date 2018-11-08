import React from "react";
import axios from "axios";

class ViewUsers extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axios.get("https://localhost:9000/api/users").then(res => {
      this.setState({
        users: res.data
      });
    }).catch(err => console.log(err));
  };

  render() {
    return (
      <div className="viewUsers">
        <h2>Users: </h2>
        {this}
      </div>
    );
  }
}

export default ViewUsers;
