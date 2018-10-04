import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    axios
      .get("http://localhost:9000/api/posts")
      .then(response => console.log(response.data))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="App">
        <h1>Posts app</h1>
      </div>
    );
  }
}

export default App;
