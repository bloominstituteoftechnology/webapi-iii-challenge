import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import CreateUser from '../CreateUser/CreateUser';
import './Users.css';

class Users extends Component {
    state = {
        users: [],
    }
    render() {
        return (
            <div className='Content'>
                <h1 className='Content__heading'>The Gang's All Here!</h1>
                {this.state.users.map(user => {
                    return (
                        <div className='User' key={user.id}>
                            <Link to={`/users/${user.id}`}>
                                <h2>{user.name}</h2>
                            </Link>
                            <button onClick={() => this.deleteUser(user.id)}>Delete User</button>
                        </div>
                    )
                })}
                <CreateUser />
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

    deleteUser(id) {
        axios
        .delete(`http://localhost:5000/api/users/${id}`)
        .then(response => {
            console.log({...response});
        }).catch(error => {
            console.log(error);
        })
    }
}


export default Users;