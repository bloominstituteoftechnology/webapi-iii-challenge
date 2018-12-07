const express = require('express');
const posts = require('../data/helpers/postDb');
const router = express.Router();

const sendUserError = (status, msg, res) => {
    res
        .status(status)
        .json({ Error: msg });
};

//******************* Get Posts ***************************
router.get('/', (req, res) => {
    posts
        .get()
        .then(allPosts => {
            res.json(allPosts);
        })
        .catch(err => {
            return sendUserError(500, 'Db unavailable', res);
        });
});
//******************* Get Single Users Posts ***************************
 router.get('/:id', (req, res) => {
    const { id } = req.params;
    posts
        .get(id)
        .then(post => {
            if (post === 0) {
                return sendUserError(404, 'No post by that user in the db', res);
            }
            res.json(post);
        })
        .catch(err => {
            return sendUserError(500, 'Db unavailable', res);
        });
});
 
/********************* Create new post ******************/
 router.post('/', (req, res) => {
    const { text, userId } = req.body;
    posts
        .insert({ text, userId })
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            return sendUserError(500, 'Db unavailable', res);
        });
}); 

/***************** Get all tags from single user *******/
 router.get('/tags/:id', (req, res) => {
    const { id } = req.params;
    posts
        .getPostTags(id)
        .then(postTags => {
            if (postTags === 0) {
                return sendUserError(404, 'Post not found', res);
            }
            res.json(postTags);
        })
        .catch(err => {
            return sendUserError(500, 'Db unavailable', res);
        });
}); 

module.exports = router;