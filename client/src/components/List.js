import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import UserView from './UserView';

const userURL = 'http://localhost:9000/api/users';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            users: []
         }
    }

    componentDidMount() {
        axios.get(userURL)
            .then(response => {
                this.setState({users: response.data})
            })
            .catch(error => {
                console.error('Error: ', error)
            })
    }

    render() { 
        return ( 
            <div>
                {this.state.users.map(user => {
                    return (
                        <UserView
                            key={user.id}
                            id={user.id}
                            user={user.name}
                        />    
                    )
                })}
            </div>
         );
    }
}
 
export default withRouter(List);