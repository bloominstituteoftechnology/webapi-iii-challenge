import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';
import {
  Container,
  Col,
  Card,
  CardTitle,
  CardBody,
  CardText,
  Row,
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5012/api/users')
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => {
        console.log(`There was an error getting users: ${error}`);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Lambda Node Blog</h1>
        </header>
        <Container className="cardContainer">
          {this.state.users.map((user, index) => {
            return (
              <Row key={index} className="cardRow">
                <Col className="cardCol d-flex align-items-stretch">
                  <Card className="cardCard">
                    <CardBody className="cardBody">
                      <CardTitle>{user.name}</CardTitle>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            );
          })}
        </Container>
      </div>
    );
  }
}

export default App;
