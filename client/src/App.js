import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Home from './components/home.js';
import UserFeed from './components/UserFeed';
import './App.css';

class App extends Component {
  render() {
    return (
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/user/:id" component={UserFeed} />
        </Switch>
      </Container>
    );
  }
}

export default App;
