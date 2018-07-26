import React from "react";
import axios from "axios";

class UserPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {
          text: ""
        }
      ]
    };
  }
  componentDidMount() {
    let id = window.location.pathname.split("/");
    id = id[2];
    console.log("id is: ", id);
    axios
      .get(`http://localhost:8000/api/users/${id}/posts`)
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log("this.state.posts is:  ", this.state.posts);
    return (
      <div>
        {this.state.posts.map(post => {
          return <p key={Math.random()}>{post.text}</p>;
        })}
      </div>
    );
  }
}

export default UserPost;
