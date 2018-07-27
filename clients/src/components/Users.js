import React from 'react';

const Users = props => {
    return (
        <div>
            {props.users.map(user => 
            <div>
                {user.name}
            </div>)}
        </div>
      );
}
 
export default Users;