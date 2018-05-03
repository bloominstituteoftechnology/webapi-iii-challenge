import { Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import Users from './Components/Users';
import User from './Components/User';
import Redirect from './Components/Redirect';

import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(err => {
        console.error(err);
      })
  }

  render() {
    return (
      <div className="App">
        <Switch>
        <Route exact path='/' component={Redirect} />
          <Route exact path='/api/users'
            render={props => <Users {...props} users={this.state.users} />}
          />
          <Route exact path='/api/users/:id' component={User} />
        </Switch>
      </div>
    );
  }
}

export default App;
