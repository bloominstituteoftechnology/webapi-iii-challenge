import React, { Component } from 'react';
// View imports
import { HomePageView, SingleUserView } from './views';
// React router imports
import { Route } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={HomePageView} />
        <Route path="/user/:id/posts" component={SingleUserView} />
      </div>
    );
  }
}

export default App;
