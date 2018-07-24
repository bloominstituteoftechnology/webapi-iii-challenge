import React from 'react';
import UserCard from './UserCard';

const Users = props => {
    return (
        <div>
            {props.users.map(user => <UserCard key={user.id} user={user} />)}
        </div>
    )
}

export default Users;