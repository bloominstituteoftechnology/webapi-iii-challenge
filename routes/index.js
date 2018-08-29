const apiRouter = require('express').Router();

const usersRouter = require('./users');

apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
