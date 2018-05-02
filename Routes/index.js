import express, { Router } from 'express';

import db from '../data/helpers/userDb';

const mainRouter = Router({ mergeParams: true });

// this router will 3 different routers
//  users, posts, tags

// /users
const userRoute = express.Router();

userRoute.get('/', async (req, res) => {
  const response = await db.get();
  res.json(response);
});

mainRouter.use('/users/', userRoute);

// /posts
mainRouter.use('/posts', () => {});

// /tags
mainRouter.use('/tags', () => {});

export { mainRouter };
