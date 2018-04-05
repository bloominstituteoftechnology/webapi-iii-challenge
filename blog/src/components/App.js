import React from 'react';

import {Route} from 'react-router-dom';

import {Container} from 'reactstrap';

import UserList from './users/UserList';
import User from './users/User';


import './App.css';

class App extends React.Component {
 render() {
    return (
      <Container>
          <Route exact path="/" component={ UserList } />
          <Route exact path="/api/users/" component={ UserList } />
          <Route path="/api/users/:id" component={ User } />
      </Container>
    );
  }
}

export default App;
