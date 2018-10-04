import React, { Component, Fragment } from "react";
import PostList from "./PostList";
import axios from "axios";
import styled from "react-emotion";

class UserDetails extends Component {
  state = {
    posts: [],
    newPostInput: ""
  };

  fetchUserPostsData = () => {
    axios
      .get(`http://localhost:7000/users/posts/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          posts: res.data
        });
      });
  };

  handleInput = event => {
    this.setState({
      newPostInput: event.target.value
    });
  };

  sumbitPost = () => {
    const text = this.state.newPostInput;
    const userId = parseInt(this.props.match.params.id);
    axios
      .post("http://localhost:7000/users/posts", { text, userId })
      .then(res => {
        this.setState({
          posts: res.data,
          newPostInput: ""
        });
      });
  };

  deletePost = id => {
    const userId = parseInt(this.props.match.params.id);
    axios
      .delete(`http://localhost:7000/users/posts/${id}/${userId}`)
      .then(res => {
        this.setState({
          posts: res.data
        });
      });
  };

  updatePost = (input, postId )=> {
    console.log('memes')
    const text = input
    const userId = parseInt(this.props.match.params.id)
    console.log(text, postId, userId)
    axios.put(`http://localhost:7000/users/posts/${postId}/${userId}`, {text})
    .then(res =>{
        this.setState({
          posts: res.data
        })
    })
}

  render() {
    const user = this.props.users.find(user => {
      return user.id === parseInt(this.props.match.params.id);
    });
    const { name, id } = user ? user : { name: "", id: "" };
    const { posts, newPostInput } = this.state;
    return (
      <Fragment>
        <StyledUserName>{name}</StyledUserName>
        <StyledUserDetailWrapper>
          <StyledNewPostWrapper>
            <h3>New Post:</h3>
            <textarea onChange={this.handleInput} value={newPostInput} />
            <StyledButtonWrapper>
              <StyledButton onClick={this.sumbitPost}>Sumbit</StyledButton>
            </StyledButtonWrapper>
          </StyledNewPostWrapper>
          <PostList
            posts={posts}
            updatePost={this.updatePost}
            deletePost={this.deletePost}
            {...this.props}
          />
        </StyledUserDetailWrapper>
      </Fragment>
    );
  }

  componentDidMount() {
    this.fetchUserPostsData();
  }
}

export default UserDetails;

const StyledUserName = styled("h1")`
  text-align: center;
`;

const StyledUserDetailWrapper = styled("div")`
  width: 800px;
  margin: auto;
  display: flex;
  justify-content: space-evenly;
`;

const StyledNewPostWrapper = styled("div")`
  width: 300px;
  height: 200px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  textarea {
    height: 100%;
  }
`;

const StyledButtonWrapper = styled("div")`
  width: 100%;
`;

const StyledButton = styled("div")`
  width: 80px;
  margin: 5px auto 0px;
  border-radius: 11px;
  border: none;
  text-align: center;
  padding: 10px;
  font-weight:bold;
  color: #fcfff5;
  background: #3e606f;
  transition: transform .2s;
  :hover{
   transform: scale(1.1)
  }
  :active{
    transform: scale(1)
  }
`;
