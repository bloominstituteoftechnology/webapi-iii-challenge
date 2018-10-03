import React, { Component } from "react";
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
