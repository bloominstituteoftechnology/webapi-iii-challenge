import React from 'react';

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
                    <div key={post.id}>
                        <p>Post ID: {post.id}</p>
                        <p>Content: {post.text}</p>
                        <p>Correlated UserID: {post.userId}</p>
                    </div>
                )
            })}
        </div>
        );
    };
};


export default Posts;