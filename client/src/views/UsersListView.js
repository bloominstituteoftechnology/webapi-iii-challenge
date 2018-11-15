import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';

import { UserList } from '../components';


class UserListView extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  render(){
    if (this.props.fetchingUsers) {
      return (
        <h3>Loading users...</h3>
      )
    }
    return (
      <UserList users={this.props.users}/>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetchingUsers: state.usersReducer.fetchingUsers,
    users: state.usersReducer.users,
    error: state.usersReducer.error
  }
}
export default connect(
  mapStateToProps,
  {
    fetchUsers
  }
)(UserListView);
