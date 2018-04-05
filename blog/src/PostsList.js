import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import PostsListContainer from './AppPrimatives/PostsListContainer';
import Wrapper from './AppPrimatives/Wrapper'

class PostsList extends Component {
    constructor(props){
        super(props)
        this.state = {
            posts: [],
            user: [],
            
        }
    }

    componentDidMount() {
        this.getPosts();
        this.getUser()
    }


    getPosts() {
        axios.get('http://localhost:5000/api/posts')
        .then(response => {
         const posts = response.data.filter( post => post.userId == this.props.match.params.id  )
            this.setState({ posts: posts})
        })
        .catch(error => console.error('Server Error: ', error))

    }

    
    getUser() {
        const  id  = this.props.match.params.id
        axios.get(`http://localhost:5000/api/users/${id}`)
        .then(response => this.setState({ user: response.data.name}))
        .catch(error => console.error('Server Error: ', error))

    }


    render(){
const Title = styled.p`
    font-size: 5rem;
`
const Text = styled.p`
    font-size: 3rem;
`
    return (
        <PostsListContainer>
            <Title>{this.state.user + ' -'}</Title>
            {this.state.posts.map((post, i )=> {
                return (

                <Text key={i}> "{post.text}"</Text>

                )
                
            })}
      
       </PostsListContainer> 
    )
  }
}

export default withRouter(PostsList);