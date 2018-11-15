import React from 'react';
import { connect } from 'react-redux';
import { fetchAllPosts } form '../actions'

class PostsListView extends React.Component {
  render(){
    return (
      <h1>Posts!</h1>
    )
  }
}

const mapStateToProps = state => {
  return {
    allPosts: state.allPostsReducer.allPosts
  }
}
export default connect(
  mapStateToProps, {
    fetchAllPosts,
  }
)
