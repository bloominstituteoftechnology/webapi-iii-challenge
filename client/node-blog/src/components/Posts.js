import React from 'react';
import axios from 'axios';

import logo from '../logo.svg';

const url = 'http://localhost:7000/posts';

class Posts extends React.Component {
  state = {
    posts: []
  }

  componentDidMount() {
    axios.get(url)
    .then(res => {
      console.log(res.data)
      this.setState({posts: res.data})
    })
    .catch(err => console.log(err))
  }

  render() {
    console.log('erf',this.state.posts)
    return (
      <main>
        <section>
          {this.state.posts.length === 0 ?
            <img src={logo} className="App-logo" alt="logo" />
            :
            this.state.posts.map((post, index) => <div key={index}>{post.text}</div>)
          }
        </section>
      </main>
    );
  }
}

export default Posts;