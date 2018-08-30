import React, { Component } from 'react';
import axios from 'axios'; 
import {Route} from 'react-router-dom'
import './App.css';
import UserList from './Components/UserList';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    const promise = axios.get('http://localhost:9000/api/users');
    promise
      .then(response => {
        this.setState({users: response.data})
      })
      .catch(error => {
        console.log(error); 
      })
  }
  render() {
    console.log(this.state.users)
    return (
      <div className="App">
        {/* {this.state.users.map(user => <div key = {user.id}>{user.name}</div>)} */}
        <Route exact path = '/' render = {(props) => <UserList users ={this.state.users}/>}/>
        
      </div>
    );
  }
}

export default App;
