import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../actions";
import styled from "styled-components";
import UserCard from './UserCard';
import { Link } from 'react-router-dom';

const HomeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  flex-direction: column;
  height: 100vh;
  overflow: scroll;
`;

const UserCardWrapper = styled(Link)`
  border-radius: 3px;
  width: 200px;
  padding: 5px;
  margin: 10px;
  background: #fff;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
`;

class Home extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <HomeWrapper>
        {this.props.fetchingUsers ? (
          <p> usrs comin </p>
        ) : (
          this.props.users.map(user => (
            <UserCardWrapper to={`/user/${user.id}`} key={user.id}>
              <UserCard user={user}/>
            </UserCardWrapper>
          ))
        )}
      </HomeWrapper>
    );
  }
}

const mapStateToProps = state => ({
  users: state.usersReducer.users,
  fetchingUsers: state.usersReducer.fetchingUsers,
});

export default connect(
  mapStateToProps,
  { fetchUsers }
)(Home);
