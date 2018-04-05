import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Users extends Component {
    state = {
        users: [],
    }
    render() {
        return (
            <div>
                {this.state.users.map(user => {
                    return (
                        <div key={user.id}>
                        <Link to={`/users/${user.id}`}>
                            {user.name}
                        </Link>
                        </div>
                    )
                })}
            </div>
        );
    }

    componentDidMount() {
        axios
            .get('http://localhost:5000/api/users')
            .then(response => {
                this.setState({
                    users: response.data
                })
            })
    }
}


export default Users;