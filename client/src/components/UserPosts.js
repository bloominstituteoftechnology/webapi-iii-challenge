import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const UserPostsContainer = styled.div`
    display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;

  h2{
    font-size: 2.6rem;
    margin: 20px 0;
  }

  p{
      font-size: 1.8rem;
      margin: 8px;
  }

  a{
      font-size: 1.6rem;
      margin-top: 15px;
  }
`;

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
                error: 'Please check that you entered a valid ID and that the user has posted'
            })
        });
    }

    render(){
        if(this.state.error){
            return(
                <div>
                    <h2>{this.state.error}</h2>
                    <Link to="/">Home</Link>
                </div>
            )
        }

        return(
            <UserPostsContainer>
                <h2>{this.state.user}</h2>
                {this.state.posts.map(post=><p key={post.id}>{post.text}</p>)}
                <Link to="/">Home</Link>
            </UserPostsContainer>
        )
    }
}

export default UserPosts;