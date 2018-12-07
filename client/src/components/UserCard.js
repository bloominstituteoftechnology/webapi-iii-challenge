import React from 'react';
import {Link} from 'react-router-dom';

const UserCard = props=>{
    return(
        <Link to={`/${props.user.id}`}>{props.user.name}</Link>
    )
}

export default UserCard;