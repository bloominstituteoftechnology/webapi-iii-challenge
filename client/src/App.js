import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import './App.css';

class App extends Component {

  state = {
    users: []
  };

  componentDidMount() {
    this.getUsers()   

  }

  getUsers = () => {
    fetch('http://localhost:4000/api/users')
    .then(res => res.json())
    .then(res => this.setState({ users: res }));
    
  }

  renderUser = ({name, id}) => (<div key={id}>
    <p>{name}</p>
  </div>
  );

  render() {
    const { users } = this.state;
    return (
      <div className="App">
      {users.map(this.renderUser)}
        
      </div>
    );
  }
}

export default App;
