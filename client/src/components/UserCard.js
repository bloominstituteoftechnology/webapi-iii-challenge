import React from 'react';

const UserCard = props => {
    return (
        <div>
            {props.user.name}
        </div>
    );
}

export default UserCard;