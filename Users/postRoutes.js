const express = require('express');
const data = require('../data/helpers/postDb');
import PostController from '../Controllers/PostControllers';

const PostRouter = express.Router();
const { getPost, getPostTags, createPost, updatePost, removePost } = PostController; 

PostRouter.get('/:id', getPost);
PostRouter.get('/:id/tags', getPostTags);
PostRouter.post('/', createPost);
PostRouter.put('/:id', updatePost);
PostRouter.delete('/:id', removePost);

export default PostRouter;