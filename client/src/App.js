import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { EventEmitter } from './events';
import AddUser from './components/AddUser';
import Users from './components/Users';

class App extends Component {
  constructor(props) {
    super(props);
    this.url = 'http://localhost:9000/api/users'
    this.state = {
      users: [],
    };
    EventEmitter.subscribe('addUser', (newUser) => this.addUser(newUser));
    EventEmitter.subscribe('deleteUser', (id) => this.deleteUser(id));
    EventEmitter.subscribe('updateUser', (editedUser) => this.updateUser(editedUser));
  }

  componentDidMount() {
    axios
      .get(this.url)
      .then(res => {
        this.setState({users: res.data});
      })
      .catch(err => {
        console.error('Error retrieving users', err);
      })
  }

  addUser = newUser => {
    axios
      .post(this.url, newUser)
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.error('Error adding user', err);
      })
    }

  deleteUser = id => {
    axios
      .delete(`${this.url}/${id}`)
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.error('Error deleting user', err);
      })
  }

  updateUser = editedUser => {
	console.log(editedUser)
    axios
      .put(`${this.url}/${editedUser.id}`, editedUser)
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.error('Error updating user', err);
      })
  }

  render() {
    return (
      <div className="App">
	  	<AddUser />
        <Users users={this.state.users} />
      </div>
    );
  }
}

export default App;
