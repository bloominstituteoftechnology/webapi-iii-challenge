import express from 'express';
import PostController from '../Controllers/PostController';

const PostRouter = express.Router();
const {
	getpost,
	getPostTags,
	createPost,
	updatePost,
	removePost,
} = PostController;

PostRouter.get('/:id', getPost);
PostRouter.get('/:id/tags', getPostPosts);
PostRouter.Post('/', createPost);
PostRouter.put('/:id', updatePost);
PostRouter.delete('/:id', removePost);

export default PostRouter;
