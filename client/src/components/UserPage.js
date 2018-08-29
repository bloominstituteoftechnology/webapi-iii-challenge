import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            posts: []
        }
    }

    componentDidMount = () => {
        axios.get('http://localhost:6001/api/users/')
            .then(response => {
                this.setState({users: response.data})
            })
        axios.get(`http://localhost:6001/api/users/${this.props.match.params.id}`)
            .then(response => {
                this.setState({posts: response.data})
            })
    }

    render() {
        if ((this.state.posts.length > 0) && (this.state.users.length > 0)) {

            let user = this.state.users.find(user => user.id === Number(this.props.match.params.id))
            console.log(user);
            return (
                <div>
                <h1>{user.name}</h1>
                <p>User ID: {user.id}</p>
                <hr/>
                {this.state.posts.map(post => 
                    <div key={post.id}>
                    <p>Post ID: {post.id}</p>
                    <p>Text: {post.text}</p>
                    <hr/>
                    </div>)}
                <div className="homeLink"><Link to="/">Home</Link></div>
            </div>
            )
        } else {
            return (<div>Loading...</div>)
        }
    }
}

export default UserPage;