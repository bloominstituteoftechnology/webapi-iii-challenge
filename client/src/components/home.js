import React, { Component } from 'react';
import UserCard from './UserCard';
import axios from 'axios';

class Home extends Component{
  constructor(){
    super();
    this.state = {

    };
  }

  componentDidMount(){
    axios.get('http://localhost:9000/api/users')
          .then(res => this.setState({ users: res.data }))
          .catch(err => this.setState({ error: err }));
  }

  render(){
    return(
      <section className="home-page">
        {this.state.users &&
          this.state.users
            .map(user =><UserCard key={user.id} {...user} />)
        }
        {this.state.error &&
          <p>{this.state.error}</p>}
      </section>
    );
  }
}

export default Home;
