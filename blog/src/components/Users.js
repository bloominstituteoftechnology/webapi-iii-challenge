import React, { Component } from 'react';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div>
        {this.props.users.map(user => {
          return (
            <div key={user.id}>
              {user.name}
            </div>
          )
        })}
      </div>
     )
  }
}
 
export default Users;