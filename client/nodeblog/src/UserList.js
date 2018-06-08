import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Header from './Header';

class UserList extends Component {
    constructor(props){
        super(props);
        this.state ={
          users:[{}]
        }
    }
     
     componentDidMount(){
        axios.get('http://localhost:5000/api/users')
          .then( res =>{
            console.log(this.state, "before CWM");
            this.setState(res.data)
              console.log(this.state.users, "after CWM")
          })
     }
     render() {
        return (
            <div className="list-of-users">
                <h2 className='char-list'>Cast of Characters</h2>
                {this.state.users.map(user =>{
                    return(
                    <div className="card-container">
                    <div key={user.id}>
                        {user.name}
                    </div>
                    </div>
                    )
                })}
                <Link to="/" component={Header}><button className="primary">Middle Earth</button></Link>
                </div>
            );
        }
}

export default UserList;