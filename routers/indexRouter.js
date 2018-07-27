const express = require('express');
const router = express.Router();

const postsRouter = require('./postsRouter');
const tagsRouter = require('./tagsRouter');
const usersRouter = require('./usersRouter');
const handleError = require('./middleware/handleError');

// routers
router.use('/posts', postsRouter);
router.use('/tags', tagsRouter);
router.use('/users', usersRouter);

// error handler
router.use(handleError);

module.exports = router;