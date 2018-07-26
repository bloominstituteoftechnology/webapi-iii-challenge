import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import UserInfo from './UserInfo';
import axios from 'axios';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          users: []
        }
      }
    
      componentDidMount() {
        this.gatherData();
      }
    
      gatherData = () => {
        axios.get("http://localhost:8000/api/users")
        .then(res => {
          this.setState({ users: res.data })
        })
        .catch(err => console.log(err))
      }

    render() { 
        console.log('props in userlist', this.props)
        return ( 
            <div>
                {this.state.users.map(u => {
                    return <UserInfo key={u.id} u={u}/>
                 
                }) }
            </div>
         );
    }
}
 
export default UserList;