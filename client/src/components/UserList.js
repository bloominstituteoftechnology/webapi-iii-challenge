import React, { Component } from 'react';
import axios from 'axios';

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
                {this.state.users.map(user => {
                    return (
                        <div key={ user.id }>
                            <h3>name: { user.name } </h3>
                        </div>       
                    )
                })}
            </div>
        )    
    }
}

export default UserList;