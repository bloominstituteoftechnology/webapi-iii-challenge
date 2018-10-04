import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchUser } from '../actions'
import UserPost from './UserPost';

class UserPage extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id)
  }

  render() {
    return (
      <Fragment>
      {this.props.fetchingPosts ? (<p>b patient</p>) :
      (<div><div>{this.props.currentUser.name}</div>
      {this.props.posts.map(post => <UserPost key={post.id} post={post} />) }</div>)}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  fetchingPosts: state.postsReducer.fetchingPosts,
  currentUser: state.usersReducer.currentUser,
  posts: state.postsReducer.posts
});

export default connect(
  mapStateToProps,
  { fetchUser }
)(UserPage);