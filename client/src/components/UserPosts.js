import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class UserPosts extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: '',
            posts: [],
            error: ''
        }
    }
    componentDidMount(){
        axios.get(`http://localhost:5000/api/users/${this.props.match.params.id}`)
        .then(userPosts=>{
            const posts = userPosts.data.map(post=>{
                return {
                    text: post.text, 
                    id: post.id
                }
            });
            this.setState({
                user: userPosts.data[0].postedBy,
                posts: posts,
                error: ''
            })
        })
        .catch(error=>{
            this.setState({
                error: 'Please check that you entered a valid ID'
            })
        });
    }

    render(){
        if(this.state.error){
            return(
                <h2>{this.state.error}</h2>
            )
        }

        return(
            <div>
                <h2>{this.state.user}</h2>
                {this.state.posts.map(post=><p key={post.id}>{post.text}</p>)}
                <Link to="/">Home</Link>
            </div>
        )
    }
}

export default UserPosts;