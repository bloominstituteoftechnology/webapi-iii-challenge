import React, { Component } from 'react';
// Redux imports
import { connect } from 'react-redux';
// Action import
import { fetchUsers } from '../actions';

class HomePageView extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    console.log(this.props.users);
    return (
      <div>
        <h1>HOME PAGE VIEW</h1>
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
