import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const CardContainer = styled.div`
    font-size: 2.4rem;
    margin: 10px 0;

    a{
        text-decoration: none;
    }
`;

const UserCard = props=>{
    return(
        <CardContainer>
            <Link to={`/${props.user.id}`}>{props.user.name}</Link>
        </CardContainer>
    )
}

export default UserCard;