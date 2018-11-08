import React from 'react';

const User = (props) => {
    return (
        <div className = "user-div">  
            <h3 onClick = {props.postDisplayForUser}>{props.user.name}</h3> 

        </div>
    )
}

export default User;