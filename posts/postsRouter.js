const express = require('express');
const posts = require('../data/helpers/postDb');

const router = express.Router();

const upperCase = (req, res, next) => {
    console.log(req.params)
    req.body.name = req.body.name.toUpperCase();
    next();
};

const sendErrorMsg = (errCode, msg, res) => {
    res.status(errCode);
    res.json({ Error: msg });
};

//New Post

router.post('/', async (req, res) => {
    try {
        const { text, userId } = req.body;
        const changes = req.body;
        if (!changes) {
            return sendErrorMsg(500, 'Both text and a UserId are required', res)
        }
        const id = await posts.insert({ text, userId });
        const post = await posts.get(id.id);
        res.status(200).json(post);
    } catch (err) {
        return sendErrorMsg(500, 'error post could not be added', res);
    }
});

//get posts

router.get('/', (req, res) => {
    posts
        .get()
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            return sendErrorMsg(500, 'Posts information could not be retrieded', res)
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    posts
        .get(id)
        .then(post => {
            if (post[0]) {
                sendErrorMsg(404, 'The post with the specified ID does not exist.', res);
            } else {
                res.status(200).json(post);
            }
        })
        .catch(err => {
            return sendErrorMsg(500, 'No User by that Id', res);
        });
});

//update post

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { text, userId } = req.body;
    const changes = req.body;
    posts
        .update(id, changes)
        .then(count => {
            count === 0 ?
                sendErrorMsg(500, 'Post id cannot be found', res) :
                res.status(200).json({ message: `${count} post was updated` })
        })
        .catch(err => {
            return sendErrorMsg(500, `the post could not be updated`)
        });
});

//delete post 

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    posts
        .remove(id)
        .then(count => {
            count === 0 ?
                sendErrorMsg(500, 'The userId could not be found', res) :
                res.status(200).json({ message: `${count} post has been removed` })
        })
        .catch(err => {
            return sendErrorMsg(500, 'The user could not be removed', res);
        });
});

module.exports = router;