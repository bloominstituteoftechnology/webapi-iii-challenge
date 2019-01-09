import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PostCard from '../../components/PostCard/';
import { connect } from 'react-redux';

import { getPosts } from '../../actions/posts/';
import { fetchUsers } from '../../actions/users/';
import PostsSettingsContainer from '../../containers/PostsSettingsContainer/';

class PostsView extends React.Component {
  constructor() {
    super();

    this.state = {
      name: ''
    }
  }

  componentDidMount() {
    this.props.fetchUsers();
    return this.props.getPosts();
  }
  getPostUserName = (userId) => {
    return this.props.getUser(userId);
  }

  render () {
    return (
      <Container>
        <Row>
          <Col md='12'>
            <h1>Posts Directory</h1>
          </Col>
        </Row>
        <Row>
          <Col md={{size: '6', offset: '3'}}>
            {this.props.fetchedPosts ? this.props.posts.map(post => {
              const users = this.props.users;
              let results = {}
              users.map(user => {
                if(user.id === post.userId) {

                  return results = Object.assign({}, post, {postedBy: user.name})
                }
                else {
                  return null;
                }
              })
              return <PostCard {...results} key={Math.random()}/>
            }) : null }
          </Col>
          <Col md='3'>
            <PostsSettingsContainer />
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetchingPosts: state.postsReducer.fetchingPosts,
    fetchedPosts: state.postsReducer.fetchedPosts,
    posts: state.postsReducer.posts,
    currentProfileView: state.usersReducer.currentProfileView,
    users: state.usersReducer.users
  }
}

export default connect(mapStateToProps, { getPosts, fetchUsers })(PostsView);
