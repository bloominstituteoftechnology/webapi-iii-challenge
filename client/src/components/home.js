import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
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
      <Container centered>
      <Grid centered textAlign="left">
        {this.state.users &&
          this.state.users
            .map(user =><Grid.Row textAlign="left" key={user.id}>
                          <UserCard key={user.id} {...user} />
                        </Grid.Row>)
        }
        {this.state.error &&
          <p>{this.state.error}</p>}
      </Grid>
      </Container>
    );
  }
}

export default Home;
