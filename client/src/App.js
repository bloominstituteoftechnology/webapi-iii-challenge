import React, { Component } from 'react';
import './App.css';
import { UsersListView } from './views';

class App extends Component {
  render() {
    return (
      <div className="App">
        <UsersListView />
      </div>
    );
  }
}

export default App;
