import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import UsersList from './components/UsersList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    }
  }

  componentWillMount() {
    axios
      .get('http://localhost:5000/api/users/')
      .then(res => {
        console.log("data: ", res.data)
        // this.setState({ users: res.data.users })
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">LOTR</h1>
        </header>
        <div className="App-intro">
          <UsersList />
        </div>
      </div>
    );
  }
}

export default App;
