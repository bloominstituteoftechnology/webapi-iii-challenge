import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchUserById, clearError } from '../actions';
import { PostsList } from '../components';



class UserPostsView extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    if (this.props.error) {
      this.props.clearError();
    }
    this.props.fetchPosts(id);
    this.props.fetchUserById(id);
  }
  render(){
      if (this.props.fetchingPosts || !this.props.activeUser) {
        return (
          <h3>Loading posts...</h3>
        )
      }
    return (
      <div className='user-view'>
        <h2>{this.props.activeUser.name}</h2>
        {this.props.error ? <h3>Sorry, we're having trouble retrieving posts for this user.</h3> : <PostsList posts={this.props.posts} />}

      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    posts: state.postsReducer.posts,
    fetchingPosts: state.postsReducer.fetchingPosts,
    error: state.postsReducer.error,
    activeUser: state.userReducer.activeUser,
  }
}
export default connect(
  mapStateToProps,
  {
    fetchPosts,
    fetchUserById,
    clearError
  }
)(UserPostsView);
