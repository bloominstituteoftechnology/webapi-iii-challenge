const express = require('express');
const router = express.Router();

const postsRouter = require('./postsRouter');
const tagsRouter = require('./tagsRouter');
const usersRouter = require('./usersRouter');

// routers
router.use('/posts', postsRouter);
router.use('/tags', tagsRouter);
router.use('/users', usersRouter);

// error handler
router.use((err, req, res, next) => {
    switch(err.code) {
        case 400:
            res
                .status(400)
                .send({success: false, data: undefined, error: 'REQUEST INFORMATION ERROR'});
        case 403:
            res
                .status(403)
                .send({success: false, data: undefined, error: 'Balance is the key, making things even is the secret to success.'});
        case 404:
            res
                .status(404)
                .send({success: false, data: undefined, error: 'ID ERROR'});
        default:
            res
                .status(500)
                .send({success: false, data: undefined, error: 'RESOURCE UNAVAILABLE'});
    }
});

module.exports = router;