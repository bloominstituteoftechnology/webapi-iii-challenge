import React from 'react';
import axios from 'axios';

class UserCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            user: {},
            posts: {}
        }
    }

    componentDidMount() {
        const user = this.props.users.find((user) => {
            if(user.id.toString() === this.state.id) {
                return user
            }
        });

        axios.get(`http://localhost:4000/api/users/${this.state.id}/posts`)
        .then((posts) => {
            this.setState({
                user: user,
                posts: posts.data
            })
        })
        .catch((error) => {
            console.log(`Server returned error of: ${error}`)
        })

        
        
    }

    render() {
        if(!this.state.user.name) {
            return <h1>Loading User....</h1>
        }
        else {
            return (
                <div className='user-card-container'>
                    <div className='user-card-namet'>{this.state.user.name}</div><br />
                    {this.state.posts.map((post) => {
                        return <p>{post.text}</p>
                    })}
                </div>
            )
            
        }
    }
}

export default UserCard;