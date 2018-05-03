import { Link } from 'react-router-dom';
import React from 'react';
import axios from 'axios';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            posts: [],
            id: Number(this.props.match.params.id)
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/users/${this.state.id}`)
            .then(response => {
                console.log('response', response)
                this.setState({ userName: response.data.name });
            })
            .catch(err => {
                console.error(err);
            });
        axios.get(`http://localhost:5000/api/users/${this.state.id}/posts`)
            .then(response => {
                console.log('response', response)
                this.setState({ posts: response.data });
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        return (
            <div>
                <h2>{this.state.userName}</h2>
                <div className="list" >
                    {this.state.posts.map(post => {
                        return (
                            <div className="list__Item" key={post.id} >
                                {post.text}
                            </div>
                        )
                    })}
                </div>
                <Link to="/api/users" >
                    <button>Return</button>
                </Link>
            </div>
        )
    }
}

export default User;