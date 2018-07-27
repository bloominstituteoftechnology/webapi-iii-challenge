import React from 'react';
import styled from 'styled-components';

const UserDiv = styled.div`
    display: inline-block
    width: 200px;
    height: 50px;
    border: 1px solid;
    padding: 10px;
    box-shadow: 1px 3px 10px;
    margin: 10px 0;
`

const User = props => {
    return (
        <UserDiv>
            {props.user.name}
        </UserDiv>
    );
}

export default User;