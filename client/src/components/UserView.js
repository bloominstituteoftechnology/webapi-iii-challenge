import React from 'react'
import axios from 'axios'

class UserView extends React.Component {
    constructor(){
        super();
        this.state = {
            // name: '',
            posts: [],
        }
    }

    componentDidMount(){
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

    // componentDidMount(){
    //     axios 
    //     .get(`http://localhost:3000/api/posts`)
    //     .then(response => {
    //       this.setState({ posts: response.data })
    //     })
    //     .catch(err => {
    //       console.log("Fail to GET posts from local server", err)
    //     })
    //   }

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
            </div>
        )
    }
}

export default UserView