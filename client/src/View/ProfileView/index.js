import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { getUser } from '../../actions/users'

class ProfileView extends React.Component {
  componentDidMount() {
    let url = window.location.href.split('/');
    const id = url[url.length-1]
    return this.props.getUser(id);
  }
  render () {
    console.log(this.props.currentProfileView)
    return (
      <Container>
        <Row>
          <Col>
            {this.props.fetchUser ? <h1>Loading User Profile...</h1> : null }
            {this.props.fetchedUser ? <h1>Welcome To  {this.props.currentProfileView.user.name}&apos;s Profile!</h1>: null }
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
    currentProfileView: state.usersReducer.currentProfileView
  }
}

export default connect(mapStateToProps, { getUser})(ProfileView);
