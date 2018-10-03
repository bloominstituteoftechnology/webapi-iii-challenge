import React, { Component } from 'react';
import axios from 'axios'; 
import {Route} from 'react-router-dom'
import './App.css';
import UserList from './Components/UserList';
import User from './Components/User';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: [],
      usersPosts: [],
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
    
    return (
      <div className="App">
        {/* {this.state.users.map(user => <div key = {user.id}>{user.name}</div>)} */}
        <Route exact path = '/' render = {(props) => <UserList users ={this.state.users} />}/>
        <Route path = '/:id' render = {(props) => <User /> } />
        
      </div>
    );
  }
}

export default App;
