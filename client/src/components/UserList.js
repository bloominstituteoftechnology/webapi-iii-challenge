import React from 'react'
import UserView from './UserView'

class UserList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
        }
    }

    render(){
        console.log(this.props)
        return (
            <div>
                Users go here
                {this.props.users.map(user => {
                    return (
                        <UserView user={user}/>
                    )
                })}
            </div>
        )
    }
}

export default UserList