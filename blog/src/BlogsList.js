import React, { Component, Fragment } from 'react';
import axios from 'axios';

import styled from 'styled-components';

class BlogsList extends Component {
    state = {
        users: [],
        posts: [],
        tags: [],
    }

    componentDidMount() {
        this.getUsers();
        this.getPosts();
        this.getTags();
    }

    getUsers() {
        axios.get('http://localhost:5000/api/users')
        .then(response => this.setState({ users: response.data}))
        .catch(error => console.error('Server Error: ', error))

    }

    getPosts() {
        axios.get('http://localhost:5000/api/posts')
        .then(response => this.setState({ posts: response.data}))
        .catch(error => console.error('Server Error: ', error))

    }

    getTags() {
        axios.get('http://localhost:5000/api/posts')
        .then(response => this.setState({ tags: response.data}))
        .catch(error => console.error('Server Error: ', error))

    }

render() { 
    
const Title = styled.p`
    font-size: 3rem;
`
    
    return (
        <Fragment>
            {this.state.users.map((user, i)=> {
                return (
                    <Title>{user.name}</Title>
                )
            })}

              {this.state.posts.map((post, i)=> {
                return (
                    <Title>{post.text}</Title>
                )
            })}

              {this.state.tags.map( tag => {
                return (
                    <Title>{tag.tag}</Title>
                )
            })}

        </Fragment>    
    )
  }
}

export default BlogsList;