import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:9000/api/users/')
        .then(res => this.setState({
            users: res.data,
          }))
        .catch(err => console.dir(err));
  }

  render() {
    if (this.state.users !== [])
      return (
        <div className="App">
          {this.state.users.map(user => <p key={user.id}>{user.name}</p>)}
        </div>
      );
    
      else {
      return (
        <div>Loading...</div>
      );
    }
  }
}

export default App;
