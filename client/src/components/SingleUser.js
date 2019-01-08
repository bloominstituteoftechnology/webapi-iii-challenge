import React from "react";
import axios from "axios";

class SingleUser extends React.Component {
  state = {
    posts: []
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`http://localhost:5000/api/users/posts/${id}`)
      .then(res => this.setState({ posts: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    const { posts } = this.state;
    console.log(posts);
    return (
      <div className="user-page">
        {posts.length !== 0 && <h2>{posts[0].postedBy}</h2>}
        {posts.map(post => (
          <div className="single-post" key={post.id}>
            <p>{post.text}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default SingleUser;
