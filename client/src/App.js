import React, { Component } from 'react';
import axios from 'axios'
import {Router, Link} from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor() {
    super()
      this.state = {
        users: [],
        posts: []
      }
   }

    componentDidMount() {
      axios
        .get('http://localhost:5000/users')
        .then(res => this.setState({users: res.data}))
        .catch(err => console.log(err))
    }

  render() {
    return (

      <div className="App">
        {this.state.users.map(user => <p key={user.id}>{user.name}</p>)}
      </div>
    );
  }
}

export default App;
