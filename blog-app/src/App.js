import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      posts: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:9000/api/posts')
      .then(response=> {
        console.log(response);
        this.setState({posts: response.data});
      })
  }

  render() {
    return (
      <div className="App">
       {this.state.posts.map(post=> {
         return <div className='post'>>{post.text}</div>
       })}
      </div>
    );
  }
}

export default App;
