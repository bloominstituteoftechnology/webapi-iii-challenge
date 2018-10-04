import React, { Component } from "react";
import User from "./User";
import styled from "react-emotion";

const UserList = props => {
    const {users} = props
    console.log(props)
  return (
    <StyledUserListWrapper>
      <h1>UserList</h1>
      {users.map(user => (
        <User {...props} user={user} />
      ))}
    </StyledUserListWrapper>
  );
};

export default UserList;

const StyledUserListWrapper = styled('div')`
  width:600px;
  margin:auto;
  text-align: center;
`