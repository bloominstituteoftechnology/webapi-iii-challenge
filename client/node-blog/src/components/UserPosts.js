import React from 'react';
import axios from 'axios';

import logo from '../logo.svg';

const url = 'http://localhost:7000/users';

class UserPosts extends React.Component {
  state = {
    userPosts: []
  }

  componentDidMount() {
    axios.get(`${url}/${this.props.match.params.id}`)
    .then(res => {
      console.log('OI',res.data)
      this.setState({userPosts: res.data})
    })
    .catch(err => console.log(err))
  }

  render() {
    console.log('rferferf',this.state.userPosts)
    return (
      <main>
        <section>
          {this.state.userPosts.length === 0 ?
            <img src={logo} className="App-logo" alt="logo" />
            :
            this.state.userPosts.map((post, index) => <div key={index}>{post.text}</div>)
          }
        </section>
      </main>
    );
  }
}

export default UserPosts;