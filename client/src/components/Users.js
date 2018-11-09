import React, { Component } from 'react';
import axios from 'axios';
import Name from './Name';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            users: []
         }
    }

    componentDidMount() {
        axios.get('https://lotr-practice.herokuapp.com/api/users')
             .then(res => {
                 this.setState({users: res.data});
             })
             .catch(err => console.dir(err));
    }

    render() { 
        if (this.state.users === []) {
            return (  
                <div>Loading...</div>    
            )
        } else {
            return (
                <div className="users">
                    {this.state.users.map(user => <Name key={user.id} user={user} />)}
                </div>
            )
        }
    }
}

export default Users;