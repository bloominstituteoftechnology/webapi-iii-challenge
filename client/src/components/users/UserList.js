import React from 'react';
import axios from 'axios';
import User from './User';

import './User.css'
class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:3500/api/users`)
            .then((response => {
                this.setState({users: response.data})
            }))
            .catch((error) => {
                console.log(error);
            })
    }
    render() {
        return (
            <div>
                <ul>
                    {this.state.users.map((user) =>{
                        return <li><User name={user.name}/></li>
                    })}
                </ul>
            </div>
        );
    }

}
export default UserList;