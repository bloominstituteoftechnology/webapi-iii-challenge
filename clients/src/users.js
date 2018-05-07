
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Link } from 'react-router-dom';
import PostList from './postList';


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
            .then((response) => {
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
                {users.map((user, i) => {
                    return (
                        <div className="User">
                            <Link to="/user">
                                <div key={user.name + i}> Name: {user.name}</div>
                            </Link>
                            <div key={user.userId + i}> userId: {user.id}</div>
                            <Link to={`/posts/${user.id}`}><button key={user.id}>Post</button></Link>

                        </div>
                    )
                })}

            </div>
        )
    }
}

export default Users; 
