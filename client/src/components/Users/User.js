import React, { Component } from 'react';
import axios from 'axios';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      posts: []
    }
  }
  
  componentDidMount() {
    if (this.props.match) {
      const id = Number(this.props.match.params.id);
      for (let user of this.props.users) {
        console.log(user);
        if (id === user.id) {
          // this.setState({ user });
          return axios.get(`http://localhost:5000/api/users/${ id }/posts`)
            .then(({ data: posts }) => {
              this.setState({ user, posts });
            })
            .catch(err => console.log(err));
        }
      }
    }
  }
  
  render() {
    console.log(this.state);
    return (
      <ul>
        {
          (this.props.match)
          ?
            <React.Fragment>
              <li>{ this.state.user.name }</li>
              <ul>
                {
                  this.state.posts.map(post => {
                    return (
                      <li key={ post.id }>{ post.text }</li>
                    )
                  })
                }
              </ul>
            </React.Fragment>
          :
            <li>{ this.props.name }</li>
        }
      </ul>
    )
  }
}
 
export default User;