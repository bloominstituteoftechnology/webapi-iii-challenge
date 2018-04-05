import React, { Component, Fragment } from 'react';
import axios from 'axios';

import styled from 'styled-components';

import { withRouter } from 'react-router-dom';

import Card from './Card';

class BlogsList extends Component {
    constructor(props){
        super(props);
    this.state = {
        users: [],
        posts: [],
        tags: [],
     }
    }
    componentDidMount() {
        this.getUsers();
        this.getTags();
    }

    getUsers() {
        axios.get('http://localhost:5000/api/users')
        .then(response => this.setState({ users: response.data}))
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

export default withRouter(BlogsList);