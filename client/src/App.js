import React, { Component } from 'react';
import axios from 'axios';

import Users from './components/container/Users';
import './App.css';


class App extends Component {

  state = {users:[]};

  componentDidMount(){
    axios.get('http://localhost:9999/api/users')
    .then(response => this.setState({...this.state, users: response.data}))
    .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <Users users={this.state.users}/>
      </div>
    );
  }
}

export default App;
