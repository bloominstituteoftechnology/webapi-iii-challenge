import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { EventEmitter } from './events';
import Users from './components/Users';
import UserPage from './components/UserPage';

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
	  	<Route path='/user/:id' render={ (props) => <UserPage {...props } />}/>
		<Route exact path='/' render={ (props) => <Users {...props} users={this.state.users} /> } />
      </div>
    );
  }
}

export default App;
