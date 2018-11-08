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
    axios.get("http://localhost:9000/api/users").then(res => {
      this.setState({
        users: res.data
      });
    }).catch(err => console.dir(err));
    console.log("Hey im trying to get users")
  };

  render() {
    return (
      <div className="viewUsers">
        <h2>Users: </h2>
        {this.state.users.map(user => {
          return <p>{user.name}</p>
        })}
      </div>
    );
  }
}

export default ViewUsers;
