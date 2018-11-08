import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: null,
         }
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        axios.get(`http://localhost:9000/api/users/${id}`)
             .then(res => {
                 this.setState({user: res.data});
             })
             .catch(err => console.dir(err));
    }

    render() { 
        if (this.state.user === null) {
            return (  
                <div>Loading...</div>    
            )
        } else {
            return (
                <div className="users">
                    <h2>{this.state.user.user.name}</h2>
                    <div className='posts'>
                        {this.state.user.posts.map(post => <Post key={post.id} post={post} />)}
                    </div>
                </div>
            )
        }
    }
}

export default User;