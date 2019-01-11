import React, { Component } from "react";
import UserCard from "./UserCard";
import { Row, Col } from "react-materialize";
import { connect } from "react-redux";
import { getUsers, getPosts } from "../store/actions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.getPosts();
  }
  render() {
    return (
      <Row>
        {this.props.users.map(user => (
          <Col s={12} m={8} l={4} key={user.id}>
            <UserCard
              user={user}
              posts={this.props.posts}
              users={this.props.users}
            />
          </Col>
        ))}
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    posts: state.posts
  };
};

export default connect(
  mapStateToProps,
  { getUsers, getPosts }
)(Dashboard);
