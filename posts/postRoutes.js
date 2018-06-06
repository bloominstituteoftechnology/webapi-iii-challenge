const express = require('express');

const postDb = require('../data/helpers/postDb');

const router = express.Router();

const userError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
}

// POST METHOD

router.post('/', (req, res) => {
    const { id } = req.params;
    const newPost = req.body;
    if (!newPost.userId || newPost.text.legnth < 1) {
        userError(400, "Missing ID or text", res);
        return;
    }
    postDb
        .insert(newPost)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            userError(400, error, res);
        })
});

// GET METHOD

router.get('/', (req, res) => {
    postDb
        .get()
        .then(posts => {
            res.json({ posts })
        })
        .catch(error => {
            userError(500, 'Somethings wrong', res);
        });
});

router.get('/userPosts/:id', (req, res) => {
    const { id } = req.params;
    postDb
        .get(id)
        .then(post => {
            if (post) {
                postsDB.getPostTags(id)
                    .then(postTags => {
                        if (postTags.length === 0) {
                            userError(404, "No tags exists in you post", res)
                        } else {
                            res.json(postTags);
                        }
                    })
            }
        })
        .catch(error => {
            userError(500, 'Somethings wrong', res);
        });
});



router.get('/:id', (req, res) => {
    const { id } = req.params;

    postDb
    .get(id)
    .then(post => {
        if (post) {
            res.json(post);
        } else {
            userError(404, "Post not found", res);
            return;
        }
    })
    .catch(error => {
        userError(500, "Somethings wrong", res);
    });
});

// DELETE METHOD

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    postDb
        .get(id)
        .then(post => {
            postDb
                .remove(id)
                .then(result => {
                    if (result === 0) {
                        userError(404, "Post cannot be found", res);
                        return;
                    } else {
                        res.json(post);
                    }
                })
                .catch(error => {
                    userError(500, "Somethings wrong", res)
                })
        })
})

// PUT METHOD

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;

    if(!update.userId || update.text.length === 0) {
        userError(400, "Please add user ID and text to post")
    }else {
        postDb
        .update(id, update)
        .then( result => {
            if( result === 0) {
                sendError(404, "Cannot find post", res);
                return;
            } else {
                res.json(udpate);
            }
        })
        .catch(error => {
            userError(500, "somethings wrong", res)
        });
    };
});

module.exports = router;



