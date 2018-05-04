import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardText, Container, Row, Col} from 'reactstrap';
import './Users.css';
import UserForm from '../UserForm/UserForm';

const Users = props => {
    return <div>
        <h1 className="usersHeader">Users List</h1>
        <UserForm handleNewUser={props.handleNewUser} addUser={props.addUser} state={props.state} />
        <Container>
          <Row className="usersRow">
            {props.users.map(user => {
              return <Link key={user.id} to={`/users/${user.id}`} className="userCard">
                  <Col sm="12">
                    <Card body>
                      <CardTitle>Name: {user.name}</CardTitle>
                    </Card>
                  </Col>
                </Link>;
            })}
          </Row>
        </Container>
      </div>;
}

export default Users;