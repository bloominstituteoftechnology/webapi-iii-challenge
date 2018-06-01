import React, { Component } from 'react';
import axios from 'axios';
import UserCard from './UserCard';

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
      }
    
    componentDidMount() {
        axios.get(`http://localhost:5001/api/users`)
            .then( res => {
                this.setState({ users: res.data })
            })
    }

    render() { 
        return (
            this.state.users.map( user => {
                return <UserCard key={user.id} user={user}/>
            })
        )
    }
}
 
export default UsersList;