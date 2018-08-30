import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
            .map(user => <Link to={`/user/${user.id}`} key={user.id}>
                            <UserCard {...user} />
                          </Link> )
        }
        {this.state.error &&
          <p>{this.state.error}</p>}
      </section>
    );
  }
}

export default Home;
