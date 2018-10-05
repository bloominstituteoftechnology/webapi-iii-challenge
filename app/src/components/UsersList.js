import React from 'react';
import User from './User';

class UsersList extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.users.map(user => {
            return (
              <User key={user.id} user={user} />
            )
          })
        }
      </div>
    )
  }
}

export default UsersList;