import React from 'react';
import { Link } from 'react-router-dom';

const styled = {
    textDecoration: 'none',
    color: 'black'
}

const UserItem = props => {
    return (
        <div className="list__Item" >
            <Link to={`/api/users/${props.user.id}`} style={styled} >
                {props.user.name}
            </Link>
        </div>
    );
};

export default UserItem;