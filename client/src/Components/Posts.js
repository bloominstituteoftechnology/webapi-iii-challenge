import React from 'react';
import axios from 'axios';


class Posts extends React.Component{
    constructor() {
        super(); 
        this.posts = {
            posts : [],
        }
    }

    componentDidMount(id) {
        console.log("######  :",id);
        axios.get('http://localhost:9000/users/:id/posts')
             .then(response => {
                 console.log(response.data)
                 // this.setState({posts : response.data})
              })
             .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <h1>Posts</h1>
            </div>
        )
    }
}

export default Posts;