import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
    border: 1px solid black;
`

const ID = styled.h1`
    font-weight: 800;
    font-size: 1.5rem;
`;

class Posts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            posts: []
        }
    };
    componentDidMount(){
        this.getPosts("http://localhost:9000/posts");
      };
    getPosts = URL => {
        fetch(URL)
            .then( res => {
            return res.json();
            })
            .then( data => {
            this.setState({ posts: data });
            })
            .catch(err => {
            console.log(err)
            });
    };
    render(){
    return (
        <div>
            {this.state.posts.map( post => {
                return (
                    <Div key={post.id}>
                        <ID>Post ID: {post.id}</ID>
                        <p>Content: {post.text}</p>
                        <p>Correlated UserID: {post.userId}</p>
                    </Div>
                )
            })}
        </div>
        );
    };
};


export default Posts;