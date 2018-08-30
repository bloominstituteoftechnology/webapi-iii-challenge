import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from "styled-components";


const Main = styled.main`
  padding: 20px;
  
  .home-heading {
    color: #222;
  }

  .home-link {
    text-decoration: none;
    color: #61DAFB;
    font-weight: bold;
    font-size: 1.5em;
    margin-top: 15px;
    padding: 8px;
    border: solid 1px #61DAFB;
    border-radius: 10px;
    background-color: rgba(34, 34, 34, .9);
  }
`;


// NavLink to Users
class Home extends React.Component {
  componentDidMount() {
    this.props.isAtHomeHandler()
  }

  componentWillUnmount() {
    this.props.isAtHomeHandler()
  }

  render() {
    return (
      <Main>
        <h1 className="home-heading">Welcome</h1>
        <NavLink className="home-link" to="/users">Enter</NavLink>
      </Main>
    );
  }
}

export default Home;
