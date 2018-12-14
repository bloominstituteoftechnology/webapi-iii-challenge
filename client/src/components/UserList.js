import React from 'react'
//import UserView from './UserView'
import { Link } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap'

import '../styles/UserList.css';

import styled from 'styled-components';

const StyledLink = styled(Link)`
    color: gray;
    text-decoration: none;
`

class UserList extends React.Component {
    constructor(props){
        super(props);
        // this.state = {
        //     users: [],
        // }
    }

    render(){
        console.log(this.props)
        return (
            <div className="user-card-container">
                Users go here...
                {this.props.users.map(user => {
                    return (
                        <div key={user.id} className="user-card">
                            <Card>
                                <CardBody>
                                    <StyledLink to={`/users/${user.id}`}> <p>{user.name}</p> </StyledLink>
                                </CardBody>
                            </Card>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default UserList