import React, { Component } from "react";
import axios from "axios";
import "./index.css";

class App extends Component {
  state = {
    users: [
      { name: "bob" },
      { name: "dave" },
      { name: "steve" },
      { name: "jim" }
    ]
  };

  componentDidMount() {
    this.refetchUsers();
  }

  refetchUsers = () => {
    axios
      .get(`http://localhost:8000/api/users`)
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div className="App">
        <h1>Node Blog</h1>
        <div>
          {this.state.users.map(user => {
            return <h3>{user.name}</h3>;
          })}
        </div>
      </div>
    );
  }
}

export default App;
