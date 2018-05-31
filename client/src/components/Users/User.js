import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps)
    const { user } = nextProps;
    return { user };
  }
  
  render() {
    return (
      <ul onClick={ this.props.renderCorrectUser }>
        {
          (this.state.user)
          ?
          <li>{ this.state.user[0].name }</li>
          :
          <li>{ this.props.name }</li>
        }
      </ul>
    )
  }
}
 
export default User;