import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state = {
      users : []
    }  
  }
  
  componentDidMount(){
    axios.get('http://localhost:8000/api/users')
      .then( ({data}) => {
        this.setState({users : data})
      })
      .catch( err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Node of the Rings</h1>
        </header>
        <div className="App-intro">
          {this.state.users.map( user => <p key={Math.random()}>{user.name}</p>)}
        </div>
      </div>
    );
  }
}

export default App;
