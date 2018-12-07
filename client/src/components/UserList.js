import React from 'react';
import {Link} from 'react-router-dom';

const UserList = (props) => {
    return (
        <div className='user-list-container'>
            {props.users.map((user) => {
                return <Link to={`user/${user.id}`} key={user.id}>{user.name}<br/></Link>;
            })}
        </div>
    )
}

export default UserList;