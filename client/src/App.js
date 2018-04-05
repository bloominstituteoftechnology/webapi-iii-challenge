import React, { Component } from "react";
import "./App.css";
import Posts from "./Components/Posts";
import {Route, Link} from 'react-router-dom';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state={
      users:[],
    }
  }
  componentDidMount(){
      axios.get('http://localhost:5000/api/users')
      .then(response=>{
        this.setState ({users:response.data})
      })
      .catch(error=>{
        console.error('Server Error', error);
      
    })
  }
  render() {
    return (
      <div className="App">
        <div className="Container">
          <div className="routerNavBar">
            <div className="header">
              <h1>Node Blog</h1>
            </div>
            <Link to="/" className="btnLink">
              <div> view Posts</div>
            </Link>
            <Link to="/users" className="btnLink">
              <div>users</div>
            </Link>
          </div>

          {/* <Route exact path="/" Component={home} /> */}

          <Route path="/" component={Posts} />
          {/* <Route path="/tag" Component={tag} /> */}
        </div>
      </div>
    );
  }
}

export default App;
