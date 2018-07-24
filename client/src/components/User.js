import React from 'react';
import axios from 'axios';
import UserCard from './UserCard';

class User extends React.Component {
    constructor() {
        super();

        this.state = {
            user: [],
            userPosts: []
        }
    }

    componentDidMount() {
        axios
            .get(`http://localhost:8000/api/users/${this.props.match.params.id}`)
            .then(response => this.setState({ user: response.data }))
            .catch(err => console.log(err));

        axios
            .get(`http://localhost:8000/api/users/posts/${this.props.match.params.id}`)
            .then(response => this.setState({ userPosts: response.data }))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <UserCard user={this.state.user} posts={this.state.userPosts} />
            </div >
        )
    }
}

export default User;