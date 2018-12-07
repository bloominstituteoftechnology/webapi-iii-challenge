import React from 'react';

class UserCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: -1,
            user: {},
            posts: {}
        }
    }

    componentDidMount() {
        const tempPosts = this.props.getUserPosts(this.props.match.params.id);
        console.log(tempPosts);
        this.setState({
            id: this.props.match.params.id,
            user: this.props.users.find((user) => {if (user.id === this.props.match.params.id) return user}),
            posts: tempPosts
        })
        
    }

    render() {
        if(this.id === -1) {
            return <h1>Loading User....</h1>
        }
        else {
            return (
                <div className='user-card-container'>
                    <div className='user-card-namet'></div><br />
                    {this.state.posts.map((post) => {
                        return <div key={post.id}>{post.text}</div>
                    })}
                </div>
            )
            
        }
    }
}

export default UserCard;