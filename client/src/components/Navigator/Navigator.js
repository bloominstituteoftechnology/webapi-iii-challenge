import React, { Component } from "react";
import styled from "react-emotion";

class Navigator extends Component {
  goHome = () => {
    this.props.history.push(`/users`);
  };

  goCreateUser = () => {
    this.props.history.push(`/user/create`);
  };

  render() {
    return (
      <StyledHeader>
        <StyledNav>
          <h2 onClick={this.goHome}>Home</h2>
          <h1>Nav Bar</h1>
          <h2 onClick={this.goCreateUser}>+Create User</h2>
        </StyledNav>
      </StyledHeader>
    );
  }
}

export default Navigator;

const StyledHeader = styled("header")`
  width: 100%;
  border-bottom: 5px solid #3E606F;
  background: #193441;
  color: #FCFFF5;
`;

const StyledNav = styled("nav")`
  display: flex;  
  margin:auto;
  width: 1000px;
  box-sizing:border-box;   
  padding: 15px;
  h1, h2{
      transition: transform 0.3s;
      margin: 0 10px;
      :hover {
          transform:scale(1.1)
      }
      :active {
          transform:scale(1)
      }
  }
`;
