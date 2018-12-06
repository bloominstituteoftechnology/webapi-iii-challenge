import axios from 'axios';

export const FETCHING_POSTS = 'FETCHING_POSTS';
export const FETCHED_POSTS = 'FETCHED_POSTS';
export const CREATING_POST = 'CREATING_POST';
export const CREATED_POST = 'CREATED_POST';
export const ERROR = 'ERROR';

export const getPosts = () => {
  return dispatch => {
    dispatch({type: FETCHING_POSTS})

    axios.get('http://localhost:3020/api/posts')
         .then(res => {
           dispatch({type: FETCHED_POSTS, payload: res.data.posts})
         })
         .catch(err => {
           console.log(err)
         })
  }
}
