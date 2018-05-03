import React from 'react';
import UserItem from './UserItem'

const Users = props => {
    return (
        <div className="list" >
            {props.users.map(user => {
                return (
                    <UserItem user={user} />
                )
            })}
        </div>
    );
};

export default Users;