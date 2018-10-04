const express = require('express');
const postDb = require('../data/helpers/postDb.js');
const userDb = require('../data/helpers/userDb.js');

const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.originalUrl);
    postDb.get()
        .then(post => {
            res.send(post);
        })
        .catch(err => res.status(500).send({error: `The post information coud not be retrieved. | ${err}`}));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    userDb.getUserPosts(id)
        .then(post => {
            if(!post) return res.status(422).send({error: `Post does not exist by that id ${id}`});
            res.send(post);
        })
        .catch(err => res.status(500).send({error: `The post information coud not be retrieved. | ${err}`}));
});

router.post('/', (req, res) => {
    const { userId, text }  = req.body;
    if ( !userId || !text ) return res.status(400).send({error: 'Please provide a userId and text to the post.'});

    const newPost = { userId, text };
    userDb.get(userId)
        .then(user => {
            if(!user) return res.status(422).send({error: 'User does not exist'})    
        });

    postDb.insert(newPost)
        .then(postId => {
            const { id } = userId;
            postDb.get(postId.id)
                .then(post => {
                    if(!post) return res.status(422).send({error: `Post does not exist by that userId ${userId}`});

                    res.status(201).json(post);
                });
        })
        .catch(err => res.status(500).send({error: `There was an error while saving the post to the database. | ${err}`}));
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { userId, text }  = req.body;
    if ( !userId || !text ) return res.status(400).send({error: 'Please provide a userId and text to the post.'});

    const newPost = { userId, text };
    postDb.update(id, newPost)
        .then(post => {
            if(!post) return res.status(422).send({error: `Post does not exist by that id ${id}`});
            res.status(200).json(post);
        })
        .catch(err => res.status(500).send({error: `The post could not be modified. | ${err}`}));
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    postDb.remove(id)
        .then(rmvdPost => {
            if(!rmvdPost) return res.status(404).send({error: `The post with the ID of ${id} does not exist.`});
            res.status(200).json(rmvdPost);
        })
        .catch(err => res.status(500).send({error: `The post could not be removed. | ${err}`}))
})

module.exports = router;