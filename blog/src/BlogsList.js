import React, { Component, Fragment } from 'react';
import axios from 'axios';

import styled from 'styled-components';

import Card from './Card';

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
                    <Card key={i} id={user.id} user={user.name}/>
                )
            })}

        </Fragment>    
    )
  }
}

export default BlogsList;