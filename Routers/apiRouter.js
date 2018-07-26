const express = require('express');

//Get all the other routers for each resource
const usersRouter = require('./userRouter')
const tagsRouter = require('./tagRouter')
const postsRouter = require('./postRouter')

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.send('Welcome to the API route');
});

apiRouter.use('/users', usersRouter);
apiRouter.use('/tags', tagsRouter);
apiRouter.use('/posts', postsRouter);

module.exports = apiRouter;