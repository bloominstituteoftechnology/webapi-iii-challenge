const express = require('express');

const router = express.Router();

const postdb = require('../helpers/postDb.js');


router.get('/', (req, res) => {
postdb
    .get()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

router.get('/:id/posts', (req, res) => {
    const { id } = req.params;
    
    postdb
    .getUserPostTags(id)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    
    postdb
        .get(id) 
        .then(post => {
            res.status(200).json(post);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

module.exports = router;