import React from 'react';
import axios from 'axios';
import User from './user.js';
class UserList extends React.Component{
    constructor(){
        super();
        this.state={
            users:[],
            loading:'true'
        }
    }
    componentDidMount(){
        axios.get('http://localhost:9000/users').then(res=>this.setState({users:res.data,loading:false})).catch(err=>console.log(err));
    }
    render() {
        if (!this.state.loading){
        return(
            <div>
                <h1>Users:</h1>
                {this.state.users.length>0?this.state.users.map((e,i)=><User data={e} key={i}/>):null}
            </div>
        )
        } else {
        return <div></div>
        }
    }
}
export default UserList;