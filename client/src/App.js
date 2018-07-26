import React from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    axios
      .get('http://localhost:5001/api/users')
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="App">
        {this.state.users.map(user => (
        <Button color='primary' key={user.id}>{user.name}</Button>
        ))}
      </div>
    );
  }
}

export default App;
