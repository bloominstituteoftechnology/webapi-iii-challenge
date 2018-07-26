import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {Route} from 'react-router-dom';
import UserList from './components/UserList';
import UserListContainer from './components/UserListContainer';
import ViewUser from './components/ViewUser';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/users')
    .then(response => {
      this.setState({users: response.data})
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        <Route exact path='/' component={props => <UserListContainer {...props} users={this.state.users} />} />
        <Route path='/api/users/:id' component={props => <ViewUser {...props} />} />
      </div>
    );
  }
}

export default App;
