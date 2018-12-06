import React from 'react';

import UserCard from './UserCard';

const DisplayUsers = props=>{
    return(
        props.users.map(user=><UserCard key={user.id} user={user}/>)
    )
}

export default DisplayUsers;