import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PostsContainer = styled.div`
    max-width: 50%;
    width: 50%;
    margin: auto
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const Post = styled.div`
    width: 500px;
    height: 50px;
    border: 1px solid;
    padding: 10px;
    box-shadow: 1px 3px 10px;
    margin: 20px auto;
`

class UserPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            posts: []
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.fetchUserPosts(id);
    }

    fetchUserPosts = async id => {
        const response = await axios.get(`http://localhost:8000/users/${id}/posts`);
        const user = await axios.get(`http://localhost:8000/users/${id}`);
        this.setState({
            user: user.data.name,
            posts: response.data
        });
    }

    render() {
        // console.log(this.state.posts[0])
        return (
            <PostsContainer>
                <h3>Posted By {this.state.user}</h3>
                {this.state.posts.map(post => {
                    return (
                        <Post key={post.id}>
                            {post.text}
                        </Post>
                    )
                })}
            </PostsContainer>
        );
    }
}

export default UserPosts;