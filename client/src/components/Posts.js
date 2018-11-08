import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: [],
      posts: []
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.fetchNote(id);
  }

  fetchNote = id => {
    axios
      .get(`http://localhost:8000/api/users/${id}`)
      .then(response => {
        //   console.log(response);
        this.setState(() => ({ name: response.data.name }));
      })
      .catch(error => {
        console.error(error);
      });

      console.log(`http://localhost:8000/api/posts/${id}/?id=${id}`);
    axios
      .get(`http://localhost:8000/api/posts/${id}?id=${id}`)
      .then(response => {
        console.log(response)
        this.setState(() => ({ posts: response.data }));
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchPost(newProps.match.params.id);
    }
  }

  render() {
    if (!this.state.name && !this.state.text) {
      return <h2>Loading data...</h2>;
    } else {
      return (
        <div>
            <Link to={`/api/users`}>Go Back</Link>
          <h1>{this.state.name}</h1>
          {this.state.posts.map(post => {
              return <p key={post.id}>{post.text}</p>
          })}
        </div>
      );
    }
  }
}

export default Posts;
