import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      posts: []
    }
  }
  render() {
    return (
      <div className="App">
       <h1 className="App-title">Node-Blog</h1>
    
      </div>
    );
  }
}

export default App;
