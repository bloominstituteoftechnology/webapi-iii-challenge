import React from 'react';
import { Container, Row, Col, Alert, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getUser, getUsersPosts } from '../../actions/users'
import PostCard from '../../components/PostCard';

class ProfileView extends React.Component {
  componentDidMount() {
    let url = window.location.href.split('/');
    const id = url[url.length-1]
    this.props.getUser(id);
    return this.props.getUsersPosts(id);
  }
  render () {
    return (
      <Container>
        <Row>
          <Col>
            {this.props.fetchUser ? <h1>Loading User Profile...</h1> : null }
            {this.props.fetchedUser ? <h1>Welcome To  {this.props.currentProfileView.user.name}&apos;s Profile!</h1>: null }
          </Col>
        </Row>
        <Row>
          <Col md={{size: '6', offset: '3'}}>
          {this.props.currentUserPosts.length === 0 && this.props.fetchedUserPosts ? <Alert color='danger' style={{fontSize: '24px', margin: '20px'}}><p>No posts {this.props.currentProfileView.user.name}</p><Button color='success'>Write Post</Button></Alert> : null }
          {this.props.fetchedUserPosts ? this.props.currentUserPosts.map(post => {
            if (post) {
              return (
                <PostCard key={post.id+Math.random()}{...post} />
              )
            }
            else {
              return null;
            }
          }) : null}
          </Col>
        </Row>
      </Container>
    )
  }
}
const mapStateToProps = state => {
  return {
    fetchUser: state.usersReducer.fetchUser,
    fetchedUser: state.usersReducer.fetchedUser,
    currentProfileView: state.usersReducer.currentProfileView,
    currentUserPosts: state.usersReducer.currentUserPosts,
    fetchedUserPosts: state.usersReducer.fetchedUserPosts
  }
}

export default connect(mapStateToProps, { getUser, getUsersPosts })(ProfileView);
