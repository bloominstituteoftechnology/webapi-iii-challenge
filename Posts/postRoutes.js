const express = require('express');

const router = express.Router();

const postDb = require('../data/helpers/postDb');

// ======================= ERROR HELPER ========================

const errorHelper = (status, message, res) => {
    res.status(status).json({ error: message });
};

// ROUTES
router.get('/', (req, res) => {
    res.status(200).send('Hello from root!')
});

// ===================== POST ENDPOINTS =====================


router.get('/api/posts', (req, res) => {
    postDb
        .get()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            return errorHelper(500, 'Database error', res);
        });
});

router.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    postDb
        .get(id)
        .then(post => {
            if (post === 0) {
                return errorHelper(404, 'Post with that id not found', res);
            }
            res.status(200).json(post);
        })
        .catch(err => {
            return errorHelper(500, 'Database error', res);
        });
});

router.post('/api/posts', (req, res) => {
    const { userId, text } = req.body;
    postDb
        .insert (userId, text)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            return errorHelper(500, 'Database error', res);
        });
});

router.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    postDb
        .remove(id)
        .then(deletedPost => {
            if(deletedPost === 0) {
                return errorHelper(404, 'Post with that id not found');
            } else {
                res.status(201).json({ success: 'Post deleted' });
            }
        })
        .catch(err => {
            return errorHelper(500, 'The post could not be removed', res );
        });
   
});

router.put('api/posts/:id', (req, res) => {
    const { id } = req.params;
    const updatedPost = req.body;
    postDb
        .update(id, updatedPost)
        .then(response => {
            if (response === 0) {
                return errorHelper(404, `The post with the specified ID: ${id} does not exist.`)
            } else {
                postDb
                    .find(id)
                    .then(post => {
                        res.json(post);
                    })
                    .catch(err => {
                        return errorHelper(500, 'Database error', res);
                    });
            }
        })
        .catch(err => {
            return errorHelper(500, 'Database error', res);
        });
});

module.exports = router;