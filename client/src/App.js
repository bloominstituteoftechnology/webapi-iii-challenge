import React, { Component } from 'react';
import './App.css';
import {withRouter,Route} from 'react-router-dom';
import UserList from './components/userlist.js';
import UserInfo from './components/userinfo.js';
class App extends Component {
 
  componentDidMount(){
    this.props.history.push('/users');
  }
  render() {
    return (
      <div className="App">
        <Route exact path='/users' component={UserList}/>
        <Route exact path='/users/:id' component={UserInfo}/>
      </div>
    );
  }
}

export default withRouter(App);
