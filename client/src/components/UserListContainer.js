import React from 'react';
import '../App.css';
import axios from 'axios';
import UserList from './UserList';
import logo from '../logo.svg';

class UserListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="post-container">
        {this.props.users ? this.props.users.map(user => {
          return (
            <UserList key={user.id} user={user} />
          )
        }) : <p>Loading...</p>}
        </div>
        </div>
    )
  }
}

export default UserListContainer;
