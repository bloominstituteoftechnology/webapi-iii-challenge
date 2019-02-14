import React, { Component } from 'react';
import './App.css';

import axios from 'axios'
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      text: ''
    }
  }
  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default App;
