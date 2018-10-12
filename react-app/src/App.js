import React, { Component } from 'react';

import axios from 'axios'
import './App.css';

class App extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    this.getRequest();
  }

  getRequest = () => {
    axios
      .get("http://localhost:3400/users")
        .then(res => 
          this.setState({
            ...this.state, users: res.data
          }))
        .catch(err => console.log(err))
  }
  render() {
    console.log(this.state.users)
    return (
      <div className="App">
        <header className="App-header">
          Greetings!
        </header>
      </div>
    );
  }
}

export default App;
