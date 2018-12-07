import React from 'react';
import styled from 'styled-components';

import UserCard from './UserCard';

const UsersContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const DisplayUsers = props=>{
    return(
        <UsersContainer>
            {props.users.map(user=><UserCard key={user.id} user={user}/>)}
        </UsersContainer>
    )
}

export default DisplayUsers;