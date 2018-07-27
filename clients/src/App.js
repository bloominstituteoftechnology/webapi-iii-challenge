import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserPosts from './components/UserPosts';

import Users from './components/Users';

class App extends Component {  
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path='/' component={Users} />
          <Route path='/users/:id' component={UserPosts} />
        </div>
      </Router>
    )
  }
}

export default App;
