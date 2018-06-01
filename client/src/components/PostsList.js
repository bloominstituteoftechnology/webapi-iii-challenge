import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post';

class PostsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        const id = this.props.location.state.id
        axios.get(`http://localhost:5001/api/users/${id}/posts`)
            .then( res => {
                console.log(res.data)
                this.setState({ posts: res.data })
            })
        
    }

    render() { 
        return (
            <div className="container">
                {this.state.posts.map( post => {
                    return <Post key={post.id} post={post}/>
                })}
            </div>
        )
    }
}
 
export default PostsList;