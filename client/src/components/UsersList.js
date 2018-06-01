import React, { Component } from 'react';

const UsersList = props => {
    return (
        <div key={props.user.id}>
            <h4>
                {props.user.name}
            </h4>
        </div>
    )
}

export default UsersList;