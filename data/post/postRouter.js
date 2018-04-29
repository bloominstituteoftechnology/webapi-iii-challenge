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

router.get('/:id/tags', (req, res) => {
    const { id } = req.params;

    postdb
        .getPostTags(id)
        .then(tags => {
            res.status(200).json(tags);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post('/', (req, res) => {
    const posts = req.body;

    postdb
    .insert(posts)
    .then(response => {
        res.status(201).json(response);
    })
    .catch(error => {
        res.status(500).json({ error: 'No post added.' });
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;

    postdb
        .update(id, update)
        .then(count => {
            if (count > 0) {
                postdb  
                    .get(id)
                    .then(update => {
                        res.status(200).json(update);
                    });
            }else {
                res.status(404).json({ message: 'Post at that id does not exist.' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    postdb 
        .get(id)
        .then(response => {
            post = {...response[0] };
            postdb
            .remove(id)
            .then(response => {
                res.status(200).json(error);
            })
            .catch(error => {
                res.status(404).json(error);
            });
        })
            .catch(error => {
                res.status(500).json(error);
            });
});

module.exports = router;