import React from 'react'
import Post from './Post'

class SingleUser extends React.Component {
    constructor(props){
    super(props)
    this.state = {
        user: {}   
    }
}

componentDidMount() {
    const userId = this.props.match.params.id;
    this.setState({
      user: this.props.users.find(user => user.id == userId)
    });
  }

render() {
    return (
        <div className="individualUser">
        <h1>{this.state.user.name}'s Section</h1>
        {this.props.posts.map(post => {
           return this.state.user.id === post.userId ? <Post key={post.id} post={post}/> : null
        })}
        </div>
        )
    }
}


export default SingleUser;