import React from 'react'
//import UserView from './UserView'
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const StyledLink = styled(Link)`
    color: white;
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
            <div>
                Users go here...
                {this.props.users.map(user => {
                    return (
                        <div key={user.id}>
                            {/*Link to UserView which shows each user list of post*/}
                            <StyledLink to={`/users/${user.id}`}> <p>{user.name}</p> </StyledLink>
                            {/* <UserView user={user}/> */}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default UserList