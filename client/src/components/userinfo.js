import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
class UserInfo extends React.Component{
    constructor (props) {
        super(props);
        this.state={
            id:'',
            name:'',
            userPosts:[],
            loading:'true'
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:9000/users/${this.props.match.params.id}`)
        .then(res=>this.setState(res.data))
        .catch(err=>console.log(err));
        axios.get(`http://localhost:9000/posts/${this.props.match.params.id}`)
        .then(res=>{console.log(res);this.setState({userPosts:res.data,loading:false})})
        .catch(err=>console.log(err));
    }
    render(){
        if (!this.state.loading){
        return(
            <div>
                <p>User's id: {this.state.id}</p>
                <p>User's name: {this.state.name}</p>
                <p>User's posts:</p>
                {this.state.userPosts.map((e,i)=><div className='card userCard' key={i}>{e.text}</div>)}
                <button className='btn waves-effect waves-light' onClick={()=>this.props.history.push('/users')}>Back To User List</button>
            </div>
        )
        } else{
            return <div></div>
        }
    }
}
export default withRouter(UserInfo);