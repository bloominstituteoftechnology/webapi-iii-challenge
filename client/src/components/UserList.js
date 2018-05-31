import React, {Component} from 'react';

const UserList = (props) => {
    console.log("TEST PROPS", props.userData);
    return (
        <div key={props.user.id}>
            <h2>{props.user.name}</h2>
        </div>
    )
}

export default UserList;