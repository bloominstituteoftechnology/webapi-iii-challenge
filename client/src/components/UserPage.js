import React, { Component } from 'react';
import axios from 'axios';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.url = 'http://localhost:9000/api/users';
    this.state = {
	  id: '',
      name: '',
      posts: []   
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params
    axios.all([
        axios.get(`${this.url}/${id}`),
        axios.get(`${this.url}/posts/${id}`)
    ])
    .then(axios.spread((userRes, postsRes) => {
        console.log(userRes.data.name);
        this.setState({
            id: userRes.data.id, 
            name: userRes.data.name,
            posts: postsRes.data.length > 0 ? postsRes.data : [{"text": "This user has no posts", "id": null}] 
        })
    }))
    .catch(err => {
        console.error('Error retrieving user', err);
    })
  }
  
	render() {
        const { name, posts } = this.state;
        return (
			<div className="user-page">
				<h3 className="user-name">{name}</h3>
				{posts.map(post => <div key={post.id} className="user-post">{post.text}</div>)}
			</div>
        )
    }
};

export default UserPage;

