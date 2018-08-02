import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import Users from './components/Users';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state= {
      userData:[]
    };
  }

  handleData= data => this.setState({userData:data});

  componentDidMount(){
    axios.get('http://localhost:9001/users')
    .then(response =>{
      this.setState({userData:response.data})
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Users />
      </div>
    );
  }
}

export default App;
