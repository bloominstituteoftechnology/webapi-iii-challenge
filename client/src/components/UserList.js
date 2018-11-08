import React from 'react';
import { Link } from 'react-router-dom';
import User from './User';


const UserList = props => {
  return (
    <div className='user-list'>
    {props.users.map(user => {
      return (
        <Link to={`/${user.id}`} key={user.id}><User user={user} /></Link>
      )}
    )}
    </div>
  )
}
export default UserList;
