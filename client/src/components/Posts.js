import React from "react";
import axios from "axios";

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.users.name,
      text: this.props.posts.text
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
        this.setState(() => ({ users: response.data }));
      })
      .catch(error => {
        console.error(error);
      });

    axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then(response => {
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
    return (
      <div>
        <h1>{this.state.users.name}</h1>
      </div>
    );
  }
}

export default Posts;
