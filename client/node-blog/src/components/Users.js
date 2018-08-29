import React from 'react';
import axios from 'axios';

import logo from '../logo.svg';

import User from './User';


const url = 'http://localhost:7000/users';


class Users extends React.Component {
  state = {
    users: []
  }

  componentDidMount() {
    axios.get(url)
    .then(res => {
      console.log(res.data)
      this.setState({users: res.data})
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <main>
        <section>
          {this.state.users.length === 0 ?
            <img src={logo} className="App-logo" alt="logo" />
            :
            this.state.users.map((user, index) => <User key={index} id={user.id} name={user.name} />)
          }
        </section>
      </main>
    );
  }
}

export default Users;