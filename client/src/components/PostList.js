import React from 'react'

import axios from 'axios'

import CreatePost from './CreatePost'


import { Card, CardBody, CardTitle, CardText } from 'reactstrap'

import '../styles/PostList.css'



class PostList extends React.Component {
    constructor(){
        super();
        this.state = {
            posts: [],
        }
    }

    componentDidMount(){
        axios 
        .get(`http://localhost:3000/api/posts`)
        .then(response => {
            this.setState({ posts: response.data })
        })
        .catch(err => {
            console.log("Fail to GET posts from local server", err)
        })
    }

    handleAddNewPost = post => {
        axios 
        .post(`http://localhost:3000/api/posts`, post)
        .then(response => {
                axios 
                .get(`http://localhost:3000/api/posts`)
                .then(response => {
                this.setState({ posts: response.data })
                })
                .catch(err => {
                console.log("Fail to GET posts from local server", err)
                })
        })
        .catch(err => {
            console.log("Fail to add a new Post to the server", err)
        })
    }



    render(){
        return(
            <div>
                <div>
                    <CreatePost handleAddNewPost={this.handleAddNewPost}/>
                </div>
                <div className="post-card-container">
                    {this.state.posts.map(post => {
                        return(
                            <div key={post.id} className="post-card">
                                <Card>
                                    <CardBody>
                                        <CardTitle>User Id: {post.userId} </CardTitle>
                                        <CardText>Text: {post.text.slice(0, 50) + (post.text.length > 50 ? "..." : "")} </CardText>
                                    </CardBody>
                                </Card>
                            </div>
                        )
                    })}
                </div>

              
            </div>
        )
    }
}

export default PostList