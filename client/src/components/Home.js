import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import logo from '../logo.svg';

import UserInfo from './UserInfo';
import UserList from './UserList';

class Home extends Component {
  render() {
    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Welcome</h1>
      </header>
      <Route exact="exact" path="/" component={UserList}/>
      <Route path="/users/:id" component={UserInfo}/>
    </div>);
  }
}

export default Home;
