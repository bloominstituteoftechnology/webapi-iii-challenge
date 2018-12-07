import axios from 'axios';

export const MyApiClient = axios.create({
  baseURL: 'https://alasalle-node-blog.herokuapp.com/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});