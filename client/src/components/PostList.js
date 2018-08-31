import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';


const postsUrl = 'http://localhost:9000/api/posts/';
const userUrl = `http://localhost:9000/api/users/`;

class  PostList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            posts: [],
            user: []
         }
    }

    componentDidMount() {
        this.getUser();
        this.getPosts();
    }

    getPosts() {
        axios.get(postsUrl)
            .then(response => {
                const posts = response.data.filter(post => 
                    post.userId === this.props.match.params.id)
                        this.setState({posts: posts})
            })
            .catch(error => {
                console.error('Error: ', error)
            })
    }

    getUser() {
        const id = this.props.match.params.id;
        axios.get(`${userUrl}${id}`)
            .then(response => {
                this.setState({user: response.data.name})
            })
            .catch(error => {
                console.error('Error: ', error)
            })
    }

    render() { 
        return ( 
            <div>
                <h1>{this.state.user }</h1>
                {this.state.posts.map((post, index) => {
                    return (
                        <p key={index}>
                            {post.text}
                        </p>
                    )
                })}
            </div>
         );
    }
}
 
export default withRouter(PostList);