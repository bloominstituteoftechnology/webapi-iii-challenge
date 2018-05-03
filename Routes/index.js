import { Router } from 'express';
import userRoute from './userRoute';

const mainRouter = Router({ mergeParams: true });

// this router will 3 different routers
//  users, posts, tags

mainRouter.use('/users', userRoute);

// /posts
mainRouter.use('/posts', () => {});

// /tags
mainRouter.use('/tags', () => {});

export default mainRouter;
