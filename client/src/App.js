import React, { Component } from 'react';

import { Route, NavLink, withRouter, Switch } from 'react-router-dom';

import axios from 'axios';
import headerImage from './lotr.jpg';

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
          <img src={headerImage} alt="The Gates of Argonath" />
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
