import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Home from './components/Home';
import UserPage from './components/UserPage'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/user/:id' component={UserPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
