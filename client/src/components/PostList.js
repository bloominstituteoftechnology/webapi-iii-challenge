import React from 'react'

import axios from 'axios'

//import CreateUser from './CreateUser'

import CreatePost from './CreatePost'

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
                    {this.state.posts.map(post => {
                        return(
                            <div key={post.id}>
                                <h3>Text: {post.text} </h3>
                                <h2>User Id: {post.userId} </h2>
                            </div>
                        )
                    })}
                </div>

                <div>
                    {/* <CreateUser handleAddNewPost={this.handleAddNewPost} /> */}
                    <CreatePost handleAddNewPost={this.handleAddNewPost}/>
                </div>
            </div>
        )
    }
}

export default PostList