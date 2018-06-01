import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }
  
  componentDidMount() {
    if (this.props.match) {
      const id = Number(this.props.match.params.id);
      for (let user of this.props.users) {
        if (id === user.id) {
          this.setState({ user });
        }
      }
    }
  }
  
  render() {
    console.log(this.state.user);
    return (
      <ul>
        {
          (this.props.match)
          ?
            <li>{ this.state.user.name }</li>
          :
            <li>{ this.props.name }</li>
        }
      </ul>
    )
  }
}
 
export default User;