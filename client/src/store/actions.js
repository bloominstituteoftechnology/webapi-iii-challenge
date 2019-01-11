import axios from "axios";

export const GET_USERS = "GET_USERS";
export const GET_POSTS = "GET_POSTS";
export const USER_POSTS = "USER_POSTS";

export const getUsers = () => dispatch => {
  axios
    .get("https://tommy-node-blog.herokuapp.com/users")
    .then(res => dispatch({ type: GET_USERS, payload: res.data }))
    .catch(err => console.log("Could not fetch users"));
};

export const getPosts = () => dispatch => {
  axios
    .get("https://tommy-node-blog.herokuapp.com/posts")
    .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
    .catch(err => console.log("Could not fetch posts"));
};

export const getUserPosts = id => dispatch => {
  axios
    .get(`https://tommy-node-blog.herokuapp.com/users/${id}/posts`, id)
    .then(res => dispatch({ type: USER_POSTS, payload: res.data }))
    .catch(err => console.log("Could not fetch user's posts"));
};
