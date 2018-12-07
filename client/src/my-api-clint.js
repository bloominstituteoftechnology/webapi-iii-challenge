import axios from 'axios';

export const MyApiClient = axios.create({
  baseURL: 'http://localhost:4000/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});