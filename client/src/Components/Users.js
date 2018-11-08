import React from 'react';
import axios from 'axios';

import User from './User';

class Users extends React.Component {
    constructor() {
        super();
        this.state = {
            users : [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:9000/users/')
             .then(response => {
                 // console.log(response.data)
                  this.setState({users : response.data})
              })
             .catch(error => console.log(error));
    }

    render() {
        console.log("  ==  ",this.state.users);
        return (
            <div>
                {this.state.users.map(user => <User 
                                                    key = {user.id}
                                                    user = {user}
                                                    postDisplayForUser = {this.postDisplayForUser} />
                )}
            </div>
        )
    }
}

export default Users;
