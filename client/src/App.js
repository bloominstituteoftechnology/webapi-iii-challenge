import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import { Route, Link, Switch } from 'react-router-dom';
import UserInfo from './UserInfo';
import UserList from './UserList';
import './App.css';
import Routes from './Routes';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    axios.get("http://localhost:8000/api/users")
    .then(res => {
      // console.log('res in CDM: ', res)
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
        </header>
        <div className="App-intro">
        {/* <Switch>
          <Route exact path='/' render={props => (
            ( <UserList {...props} stateP={this.state.users}/> )
          )} />
          <Route exact path='/users/:id' render={props => (
            ( <UserInfo {...props} stateP={this.state.users}/> )
          )} />
        </Switch> */}
           {this.state.users.map(u => {
            return <div key={u.id} className='userWrapper'>
                    
                      <Link to={`/users/${u.id}`}>
                       
                        {u.name}
                       
                      </Link>
       
                  </div>
          })}

                    {/* <Route exact path='/users/:id' render={props => (
                    <UserInfo {...props}/> )}></Route> */}
        </div>
      </div>
    );
  }
}

export default App;
