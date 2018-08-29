import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import User from './components/User';
import UserPage from './components/UserPage';
import { Route, Link } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();

    this.state = {
      users: []
    }
  }

  componentDidMount = () => {
    axios.get('http://www.localhost:6001/api/users')
      .then(response => {
        this.setState({users: response.data})
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the *sweet* users DBs</h1>
        </header>
          {this.state.users.map(user => <Route exact path="/" render={props => <Link to={`/${user.id}`}><User user={user} key={user.id} {...props} /></Link>} />)}
          <Route path="/:id" render={props => <UserPage array={this.state.users} {...props}/>} />
      </div>
    );
  }
}

export default App;
