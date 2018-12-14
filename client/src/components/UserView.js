import React from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom';

class UserView extends React.Component {
    constructor(){
        super();
        this.state = {
            // name: '',
            posts: [],
        }
    }

    componentDidMount(){
        this.getPost()
        // const id = this.props.match.params.id
        // axios 
        // .get(`http://localhost:3000/api/users/${id}`)
        // .then(response => {
        //     console.log(response.data)
        //     this.setState({ posts: response.data })
        // })
        // .catch(err => {
        //     console.log("Fail to get individual user", err)
        // })
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.id !== this.props.match.params.id){
            this.getPost();
        } 
    }

    getPost = () => {
        const id = this.props.match.params.id
        axios 
        .get(`http://localhost:3000/api/users/${id}`)
        .then(response => {
            console.log(response.data)
            this.setState({ posts: response.data })
        })
        .catch(err => {
            console.log("Fail to get individual user", err)
        })
    }

    handleDelete = event => {
        event.preventDefault();
        this.props.handleDeleteUser(this.props.match.params.id)
    }

  

    //this needs to render LIST of EACH USER posts
    render(){
        console.log(this.state.posts)
        return (
                <div>
                    {this.state.posts.map(post => {
                        return(
                            <div key={post.id}>
                                {post.text}
                            </div>
                        )
                    })}
                    <div onClick={this.handleDelete}><Link to="/users/create"> DELETE X </Link></div>
                </div>
        )
    }
}

export default UserView