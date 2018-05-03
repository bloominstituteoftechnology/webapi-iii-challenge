import { Router } from 'express';
import userRoute from './userRoute';
import postsRoute from './postsRoute';
import posttagRoute from './posttagRoute';

const mainRouter = Router({ mergeParams: true });

// this router will 3 different routers
//  users, posts, tags

mainRouter.use('/users', userRoute);

// /posts
mainRouter.use('/posts', postsRoute);

// /tags
mainRouter.use('/tags', posttagRoute);

export default mainRouter;
