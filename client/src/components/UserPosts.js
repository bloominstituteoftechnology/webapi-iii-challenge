import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserPosts, getUsers } from "../store/actions";
import { Row, Col, CardPanel } from "react-materialize";

class UserPosts extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getUserPosts(id);
    this.props.getUsers();
  }

  render() {
    const { userPosts } = this.props;

    return (
      <Row>
        {/* <h4>{user.name}</h4> */}
        {userPosts.map(post => (
          <Col s={12} key={post.id}>
            <CardPanel>
              <h4>{post.text}</h4>
            </CardPanel>
          </Col>
        ))}
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    userPosts: state.userPosts
  };
};

export default connect(
  mapStateToProps,
  { getUserPosts, getUsers }
)(UserPosts);
