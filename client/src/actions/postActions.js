import axios from 'axios';
import {
  FETCHING_POSTS,
  POSTS_FETCHED,
  FETCHING_POST,
  POST_FETCHED,
  FETCHING_POST_TAGS,
  POST_TAGS_FETCHED,
  ADDING_POST,
  POST_ADDED,
  POST_ERROR
} from '../constants/actionTypes';

export const getAllPosts = () => {
  const getPosts = axios.get('http://localhost:5000/api/posts');
  return (dispatch) => {
    dispatch({ type: FETCHING_POSTS});
    getPosts
      .then(response => {
        dispatch({
          type: POSTS_FETCHED,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: POST_ERROR,
          payload: err
        });
      });
  }
}

export const getSinglePost = postId => {
  const getPost = axios.get(`http://localhost:5000/api/posts/${postId}`);
  return (dispatch) => {
    dispatch({ type: FETCHING_POST });
    getPost
      .then(response => {
        dispatch({
          type: POST_FETCHED,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: POST_ERROR,
          payload: err
        });
      });
  }
}

export const getPostTags = postId => {
  const getTagsByPostId = axios.get(`http://localhost:5000/api/posts/${postId}/tags`);
  return (dispatch) => {
    dispatch({ type: FETCHING_POST_TAGS });
    getTagsByPostId
      .then(response => {
        dispatch({
          type: POST_TAGS_FETCHED,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: POST_ERROR,
          payload: err
        });
      });
  }
}

export const createPost = postObj => {
  const createNewPost = axios.post('http://localhost:5000/api/posts', postObj);
  return (dispatch) => {
    dispatch({ type: ADDING_POST });
    createNewPost
      .then(response => {
        dispatch({
          type: POST_ADDED,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: POST_ERROR,
          payload: err
        });
      });
  }
}