import React from 'react';
import axios from 'axios'

class User extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {},
            posts: []
        }
    }
    componentDidMount = () => {
        axios.get(`http://localhost:5000/api/users/${this.props.match.params.id}`)
            .then(result => {
                this.setState({ user: result.data.user, posts: result.data.posts })
            })
    }
    render() {
        console.log(this.props)
        return (
            <div className="user">
                <h4>{this.state.user.name}</h4>
                <ul>
                    <p>{this.state.user.name}'s Posts:</p>
                    {this.state.posts.map(e => {
                        return (
                            <li key={e.id}>
                                {e.text}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default User