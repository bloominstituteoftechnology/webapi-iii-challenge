import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import User from './components/users/user';
import UserInput from './components/users/userInput';
import styled from 'styled-components';

class App extends Component {
  state = {
    users: [],
    deselect: false
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axios.get('http://localhost:5000/users')
      .then(res=> {
        this.setState({users: res.data.users})
      })
      .catch(err => console.log(err));
  }

  toggleDeselect = () => {
    this.setState({deselect: !this.state.deselect});
  }
  render() {
    return (
      <body onClick={()=>this.toggleDeselect()}>

      <UserHolder className="App">
      <h1>Users of the Rings</h1>
      {this.state.users.map(user => (
        <User getUsers={this.getUsers} user={user} deselect={this.state.deselect} toggleDeselect={this.toggleDeselect} />
        ))}
      <UserInput getUsers={this.getUsers} />
      </UserHolder>
        </body>
    );
  }
}

let UserHolder = styled.div`
  color: lightgray;
`

export default App;
