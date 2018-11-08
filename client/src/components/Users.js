import React from 'react';
import User from './User';

const Users = ({ users }) => {
    return (
      <div className="user-list">
        <h1 className='user-list-title'>Users</h1>
        <ul>
          {users.map(user => {
            return (
              <User user={user}/>
            );
          })}
        </ul>
      </div>
    );
}

export default Users;