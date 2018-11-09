import React from 'react';
import AddUser from './AddUser';
import User from './User';

const Users = ({ users }) => {
    return (
      <div className="user-list">
        <AddUser />
        <h1 className='user-list-title'>Users</h1>
        <ul>
          {users.map(user => {
            return (
              <User key={user.id} user={user}/>
            );
          })}
        </ul>
      </div>
    );
}

export default Users;