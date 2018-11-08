import React from 'react';
import { Route } from "react-router-dom";
import Users from './components/Users';
import User from './components/User';

const App = () => {
  return (
    <div className="App">

      <Route exact path='/' 
        render={(props) => (
          <Users {...props} />
        )} 
      />

      <Route
        path="/:id"
        render={props => (
          <User {...props} />
        )}
      />

    </div>
  )
}

export default App;
