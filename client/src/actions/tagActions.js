import axios from 'axios';
import {
  FETCHING_TAGS,
  TAGS_FETCHED,
  ADDING_TAG,
  TAG_ADDED,
  TAG_ERROR
} from '../constants/actionTypes';

export const getAllTags = () => {
  const getTags = axios.get('http://localhost:5000/api/tags');
  return (dispatch) => {
    dispatch({ type: FETCHING_TAGS });
    getTags
      .then(response => {
        dispatch({
          type: TAGS_FETCHED,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: USER_ERROR,
          payload: err
        });
      });
  }
}

export const createTag = () => {
  const createNewTag = axios.post('http://localhost:5000/api/tags');
  return (dispatch) => {
    dispatch({ type: ADDING_TAG });
    createNewTag
      .then(response => {
        dispatch({
          type: TAG_ADDED,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: USER_ERROR,
          payload: err
        });
      });
  }
}