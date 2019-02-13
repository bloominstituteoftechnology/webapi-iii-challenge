import React, {
  Component
} from 'react';

import './App.css';

import {
  Route,
  Link
} from 'react-router-dom';
import UsersView from './views/usersView';

class App extends Component {
  render() {
    return (
      <div className='app-container'>
        <nav>
          <Link exact to='/'>
            Home
          </Link>

          <Link to='/users'>
            Posts By User
          </Link>
        </nav>  

        <div className='content-container'>
          <Route 
            path='/users'
            component={UsersView}
          />
        </div>
      </div>
    );
  }
}

export default App;
