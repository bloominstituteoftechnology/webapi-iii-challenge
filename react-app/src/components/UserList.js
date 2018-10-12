import React from 'react';

function UserList(props) {
    return (
        <div>
            {props.users.map((user, index) => (
                <div key={index}>
                    Character Names:   {user.name}
                </div>
            ))}
        </div>
    )
}
export default UserList;