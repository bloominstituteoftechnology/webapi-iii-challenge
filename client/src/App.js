import React, { Component } from 'react';

import axios from 'axios';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:9000/api/users')
      .then(response => {
        console.log('response', response.data);
        this.setState({ users: response.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <img />
          {this.state.users.map(user => (
            <div key={user.id}>
              <h2 className="character">{user.name}</h2>
            </div>
          ))}
        </header>
      </div>
    );
  }
}

export default App;
