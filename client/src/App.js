import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Posts from './components/Posts';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" component={Home} />
          <Route exact path="/posts" component={Posts} />
        </div>
      </Router>
    );
  }
}

export default App;
