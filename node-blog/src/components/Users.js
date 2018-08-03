import React from 'react';
import User from './User';


const Users= props => {
    return (
        <div>
            {props.name.map(user =>{
                return (
                    <User
                        handleData={props.handleData}
                        key= {user.id}
                        name={user.name}
                        
                    />
                );
            })}
        </div>
    );
}

export default Users;