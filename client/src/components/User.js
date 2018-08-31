import React from "react";
import styled from "styled-components";
import {
  secondaryColor,
  primaryColor,
  tertiaryColor,
  tertiaryColorLight
} from "../styles";

export const Paper = styled.div`
  /* padding: 5rem; */
  background-color: ${secondaryColor};
  color: ${primaryColor};
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 3rem;
  }
`;

const UserName = styled.div`
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const background = `linear-gradient(
    to right,
    ${tertiaryColor},
    ${tertiaryColorLight}
  )`;

const Avatar = styled.div`
  width: 8rem;
  height: 5.5rem;
  padding-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: ${background};
  color: ${secondaryColor};
  margin-right: 2rem;
  font-size: 2.4rem;
  font-weight: 300;
  clip-path: polygon(0 0, 100% 0, 80% 50%, 100% 100%, 0 100%);
`;

const User = ({ user: { id, name }, history }) => {
  return (
    <Paper onClick={() => history.push(`/users/${id}`)}>
      <Avatar>{name.charAt(0).toUpperCase()}</Avatar>
      <UserName>{name}</UserName>
    </Paper>
  );
};

export default User;
