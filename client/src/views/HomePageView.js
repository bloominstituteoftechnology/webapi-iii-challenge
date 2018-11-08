import React, { Component } from 'react';
// Redux imports
import { connect } from 'react-redux';
// Action import
import { fetchUsers } from '../actions';
// Components imports
import { PostList } from '../components';

class HomePageView extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { users } = this.props;
    return (
      <div>
        <PostList users={users} />
      </div>
    );
  }
}

// Puts the state into the props
const mapStateToProps = ({ users }) => {
  return {
    users
  };
};

// Connects the states and actions to the props
export default connect(
  mapStateToProps,
  { fetchUsers }
)(HomePageView);
