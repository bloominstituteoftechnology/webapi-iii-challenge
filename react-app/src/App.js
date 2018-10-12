import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios'
import './App.css';
import UserList from './components/UserList';

class App extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    this.getRequest();
  }

  getRequest = () => {
    axios
      .get("http://localhost:3400/users")
        .then(res => {
          console.log(res);
          this.setState({
            ...this.state, users: res.data
          })
        })
        .catch(err => console.log(err))
  }
  render() {
    console.log(this.state.users)
    return (
      <div className="App">
        <header className="App-header">
          Greetings!
        </header>

        <Link to="users" >View All Users</Link>


        <Route 
        path="/users"
        render={ (props) => 
        
        <UserList {...props}
        users={this.state.users}/> }
        />
      </div>
    );
  }
}

export default App;
