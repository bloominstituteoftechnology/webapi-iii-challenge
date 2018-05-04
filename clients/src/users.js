import React, { Component } from 'react';
const axios = require('axios');
class Users extends Component {

    constructor(props) {
        super(props)
        console.log('props', this.props);
        this.state = {
            users: []
        }
    }
    fetchingUsers = () => {
        axios.get('http://localhost:5000/users?pass=mellon')
            .then((response, data) => {
                this.setState({ users: response.data });

            })
            .catch(err => console.log(err));
    }
    componentDidMount = () => {
        this.fetchingUsers()
    }
    render() {
        console.log('users', this.state.users)
        const { users } = this.state

        return (
            <div>
                {users.map(user => {
                    return (
                        <div>
                            <div key={user.name}> Name: {user.name}</div>
                            <div key={user.userId}> userId: {user.id}</div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Users; 
