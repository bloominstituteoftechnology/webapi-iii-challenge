import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

const url = 'http://localhost:7000/users';

class App extends Component {
  state = {
    users: [],
    posts: []
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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <main>
          <section>
            {this.state.users.length === 0 ?
              <img src={logo} className="App-logo" alt="logo" />
              :
              this.state.users.map((user, index) => <div key={index}>{user.id}: {user.name}</div>)
            }
          </section>
        </main>
      </div>
    );
  }
}

export default App;
