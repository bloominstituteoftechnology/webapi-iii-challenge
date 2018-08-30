import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Post from './Post';

class UserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            posts: []
        }
    }

    componentDidMount = () => {
        axios.get(`http://localhost:6001/api/users/${this.props.match.params.id}`)
            .then(response => {
                this.setState({user: response.data})
            })
        axios.get(`http://localhost:6001/api/users/${this.props.match.params.id}/posts`)
            .then(response => {
                this.setState({posts: response.data})
            })
    }

    render() {
        if ((this.state.posts.length > 0) && (this.state.user)) {

            // let user = this.state.users.find(user => user.id === Number(this.props.match.params.id))
            console.log(this.state.user);
            return (
                <div>
                <h1>{this.state.user.name}</h1>
                <p>User ID: {this.state.user.id}</p>
                <hr/>
                {this.state.posts.map(post => <Post post={post} key={post.id} />)}
                <div className="homeLink"><Link to="/">Home</Link></div>
            </div>
            )
        } else {
            return (<div>Loading...</div>)
        }
    }
}

export default UserPage;