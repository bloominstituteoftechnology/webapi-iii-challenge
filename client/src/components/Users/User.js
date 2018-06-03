import React, { Component, Fragment } from 'react';
import axios from 'axios';

import './style/User.css';

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
        if (id === user.id) {
          return axios.get(`/api/users/${ id }/posts`)
            .then(({ data: posts }) => {
              this.setState({ user, posts });
            })
            .catch(err => console.log(err));
        }
      }
    }
  }
  
  render() {
    const { posts, user } = this.state;
    const { match, name } = this.props;
    
    const users = posts.map(post => {
      return (
        <li key={ post.id } className='user__post'>{ post.text }</li>
      );
    });
    
    return (
      <ul className='user-container__user'>
        {
          (match)
          ?
            <Fragment>
              <li className='user__name single'>{ user.name }</li>
              <ul className='user__posts-container'>
                { users }
              </ul>
            </Fragment>
          :
            <li className='user__name'>{ name }</li>
        }
      </ul>
    );
  }
}
 
export default User;