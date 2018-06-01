import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = (props) => {
    return (
        <div className="userCard">
            <Link to={{
                pathname: `/users/${props.user.id}/posts`,
                state: { id: props.user.id }
            }}>{props.user.name}</Link>
        </div>
    )
}
 
export default UserCard;