import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import UserInfo from './UserInfo';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this.gatherData();
  }

  gatherData = () => {
    axios.get("http://localhost:8000/api/users")
    .then(res => {
      this.setState({ users: res.data })
    })
    .catch(err => console.log(err))
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <Route exact path='/users/:id' component={UserInfo}></Route>
        </header>
        <div className="App-intro">
          {this.state.users.map(u => {
            return <div key={u.id} className='userWrapper'>
                    <Link to={`/users/${u.id}`}>{u.name}</Link>
                  </div>
          })}

                    <Route exact path='/users/:id' render={props => (
                    <UserInfo {...props}/> )}></Route>
        </div>
      </div>
    );
  }
}

export default App;
