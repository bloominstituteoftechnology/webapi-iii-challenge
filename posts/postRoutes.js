const postDB = require('../data/helpers/postDb');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    postDB.get()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.error('error', err);

        res.status(500).json({ error: 'The posts information could not be retrieved.' });
    });
});

router.get('/:id', (req, res) => {
    postDB.get(parseInt(req.params.id))
    .then(post => {
        if( post.length === 0) {
            res.status(404).json({ error: 'The post with the specified ID does not exist.' })
        }
        else {
            res.status(200).json(post);
        }  
    })
    .catch(err => {
        console.error('error', err);

        res.status(500).json({ error: 'The post information could not be retrieved.' });
    });
});

router.get('/:id/tags', (req, res) => {
    postDB.getPostTags(req.params.id)
    .then(postTags => {
        if( postTags.length === 0) {
            res.status(404).json({ error: 'The posts with the specified ID do not exist.' })
        }
        else {
            res.status(200).json({postTags});
        }  
    })
    .catch(err => {
        console.error('error', err);

        res.status(500).json({ error: 'The posts information could not be retrieved.' });
    });
});

router.post('/', async (req, res) => {
    const post = req.body;
    if (post.text && post.userId) {
        try {
            const response = await postDB.insert(post);
            res.status(201).json({ message: "Posted!"});
        } 
        catch(err) {
            res.status(500).json({
                title: 'Error',
                description: 'There was an error while saving the post to the database',
            });
        }
    } else {
        res.status(422).json({ errorMessage: 'Please provide post content and userId for the post.' });
    }
});

router.put('/:id', (req, res) => {
    postDB.update(req.params.id, req.body)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => res.status(500).json({ message: "Update failed." }));
});

router.delete('/:id', (req, res) => {
    const { id } = req.params; // the same as const id = req.params.id but destructuring the code
    postDB.remove(id)
        .then(count => {
            console.log('count: ', count);
            if(count) {
                res.status(204).end()
            } else {
                res.status(404).json({ message: 'No user with this id was found.' });
            }
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;