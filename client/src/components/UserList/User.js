import React from "react";
import styled from 'react-emotion'

const User = props => {
  const { id, name } = props.user;
  return (
    <StyledUserWrapper onClick = {() => props.history.push(`/users/${id}`)}>
      <StyledUserNames>{name}</StyledUserNames>
    </StyledUserWrapper>
  );
};

export default User

const StyledUserWrapper = styled('div')`
  
`

const StyledUserNames = styled('h3')`
display: inline-block;
transition: font-size .2s;
:hover{
  font-size: 24px;
}

`