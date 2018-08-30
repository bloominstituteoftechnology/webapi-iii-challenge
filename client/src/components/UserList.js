import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link } from "react-router-dom";

import UserPost from './UserPost';


class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [] 
        };
    }

    componentDidMount() {
        const endpoint = 'http://localhost:9000/users';

        axios
        .get(endpoint)
        .then(response => {
            this.setState(() => ({ users: response.data }));
        })
        .catch(error => {
            console.error('Server Error', error);
        });
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.users.map(user => {
                        return (
                            <li key={ user.id }>
                                <Link to={`/users/${ user.id }`}>
                                    name: { user.name }
                                </Link>
                            </li>       
                        )
                    })}
                </ul>

                <Route exact path="/users/:id" render={(props) => <UserPost {...props} users={ this.state.users } />}/>
            </div>
        )    
    }
}

export default UserList;