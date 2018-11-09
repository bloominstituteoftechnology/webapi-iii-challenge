import React, { Component } from 'react';
// Redux imports
import { connect } from 'react-redux';

// Action imports
import { fetchUsersPost } from '../actions';

class SingleUserView extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchUsersPost(id);
  }
  render() {
    const { posts } = this.props;
    // console.log(posts);
    return (
      <div>
        {posts.map((post, index) => {
          return <h1 key={index}>{post.text}</h1>;
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    posts
  };
};

export default connect(
  mapStateToProps,
  { fetchUsersPost }
)(SingleUserView);
