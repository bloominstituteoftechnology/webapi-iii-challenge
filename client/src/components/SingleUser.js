import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

    if (posts.length === 0) {
      return (
        <div className="empty">
          <h2>This user has no posts</h2>
          <Link to="/users" className="back">
            Back to Users
          </Link>
        </div>
      );
    }

    return (
      <>
        {posts.length > 0 && (
          <div className="user-page">
            {posts.length !== 0 && <h2>{posts[0].postedBy}</h2>}
            {posts.map(post => (
              <div className="single-post" key={post.id}>
                <p>{post.text}</p>
              </div>
            ))}
          </div>
        )}
        <Link to="/users" className="back">
          Back to Users
        </Link>
      </>
    );
  }
}

export default SingleUser;
