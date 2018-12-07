import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      loading: true
    }
  }
  
  componentDidMount() {
    axios
      .get('http://localhost:4001/posts')
      .then(response => {
        this.setState({
          posts: response.data
        })
      })
      .catch(err => {
        console.log(err)
      });
  }

  render() {
    return (
      <div>
        {this.state.posts.map(post => 
          <div key={post.id}>
            <h1>{post.text}</h1> 
          </div>
        )}
      </div>
    );
  }
}

export default App;
