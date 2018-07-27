import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import Users from './components/Users';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    }
  }
  
  componentDidMount() {
    this.fetchData('http://localhost:8000/users');
  }

  fetchData= async (URL) => {
    const response = await axios.get(URL);
    this.setState({ 
      users: response.data
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route path='/' render={props => <Users {...props} users={this.state.users}/>} />
        </div>
      </Router>
    );
  }
}

export default App;
