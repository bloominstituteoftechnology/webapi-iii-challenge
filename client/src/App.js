import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = { users: [] };
  }

  URL = 'http://localhost:5000/api';

  componentDidMount() {
    axios.get(`${this.URL}/users`)
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="users">
          {this.state.users.map(user => {
            return (
              <div className="user" key={user.id}>
                <h3>{user.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
