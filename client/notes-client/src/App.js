import React, { Component } from 'react';
import axios from 'axios';
import {
  Card,
  CardBody,
  Button,
  CardTitle,
  CardText,
  CardImg
} from 'reactstrap';
import './App.css';

class App extends Component {
  state = {
    users: [],
    posts: [],
    tags: []
  };

  componentDidMount() {
    axios
      .get('http://localhost:5309/api/users')
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <h1>Movie Characters and Their Quotes</h1>
        <div className="userContainer">
        {this.state.users.map(user => {
          return (
            <div className="users" key={user.id}>
              
              <Card>
                <CardBody>
                  <CardTitle>{user.name}</CardTitle>
                </CardBody>
              </Card>
              </div>
            
          );
        })}
        </div>
      </div>
    );
  }
}

export default App;
