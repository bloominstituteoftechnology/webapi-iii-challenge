import React from 'react'
import { Container, Row, Col, Input} from 'reactstrap';
import { Link } from 'react-router-dom';

import UserCard from '../../components/userCard';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/users/';
import LoaderStar from '../../components/LoaderStar';


class UsersView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      search: ""
    }
  }

  componentDidMount() {
    this.props.fetchUsers();

    return this.setState({
      users: this.props.users
    })
  }

  onChangeHandler = (e) => {
    return this.setState({[e.target.name]: e.target.value})
  }

  render () {
   return (
     <Container>
       <Row>
         <Col>
           <h1>Users List</h1>
         </Col>
       </Row>
       <Row>
        <Col md={{size: '6', offset: "3"}}>
          <Input name='search' placeholder='Search' onChange={this.onChangeHandler}
                 value={this.state.search}/>
        </Col>
       </Row>
       <Row style={{display: 'flex', justifyContent: 'space-evenly'}}>
         {this.props.fetchingUser ? <LoaderStar /> : null}
       {this.props.users.map(user => {
         return (
             <Col md="3" style={{color: 'purple', backgroundColor: 'lightblue', padding: '10px', margin: '10px'}}>
               <Link to={`/users/${user.id}`} style={{textDecoration: 'none'}}>
                 <UserCard {...user} />
               </Link>
             </Col>
         )
       })}
       </Row>
     </Container>
   );
  }
}

const mapStateToProps = state => {
  return {
    fetchingUser: state.usersReducer.fetchingUser,
    fetchedUser: state.usersReducer.fetchedUser,
    users: state.usersReducer.users
  }
}

export default connect(mapStateToProps, {fetchUsers})(UsersView);
