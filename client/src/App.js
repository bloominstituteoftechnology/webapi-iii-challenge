import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8000/api/users`)
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        {this.state.users.map(user => {
          return <div className="user"><div>{user.name}</div></div>
        })}
      </div>
    );
  }
}

export default App;
