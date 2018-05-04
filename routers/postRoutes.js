import express from 'express';
import PostController from '../controllers/PostController';

const postRoutes = express.Router();
const { getPosts, getPost, getPostTags, createPost, updatePost, deletePost } = PostController;

postRoutes.get('/', getPosts);
postRoutes.get('/:id', getPost);
postRoutes.get('/:id/tags', getPostTags);
postRoutes.post('/', createPost);
postRoutes.put('/:id', updatePost);
postRoutes.delete('/:id', deletePost);

export default postRoutes;