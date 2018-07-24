import React from 'react';
import UserCard from './UserCard';
import { Link } from 'react-router-dom';

const Users = props => {
    return (
        <div>
            {props.users.map(user => <Link to={`/users/${user.id}`} className='user-link' key={user.id}> <UserCard user={user} /> </Link>)}
        </div>
    )
}

export default Users;